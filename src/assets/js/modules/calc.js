import Vue from 'vue/dist/vue.js'
import axios from 'axios'
import Datepicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/ru';
import {xlWidth} from "./window-width-values";

const calcTemplate = `
 <div class="calc-section__block">
     <div class="calc-section__datepicker" :class="{open:datePickerFocus}">
        <div class="calc-section__datepicker-title">выбор даты прибытия</div>
        <div class="calc-section__datepicker-add">
            <p>Ветер свыше 14 м/с</p>
            <p>Коэффициент 1,15</p>
        </div>
      <datepicker inline v-model="form.date" valueType="DD.MM.YYYY" @pick="pickDate" :get-classes="getClasses"/>
    </div>
   
    <div class="calc-section__title text">
        <h2>Расчет стоимости</h2>
        <p>Заполните поля, чтобы рассчитать стоимость услуги</p>
    </div>
    <form action="#" class="calc-section__form form" @submit.prevent="formSubmit">
        <div class="row" >
            <div class="col-12" :class="{
            'd-flex': calcPage,
            'justify-content-between': calcPage
            }">
                <div class="form__group calc-section__float-values">
                    <div class="form__input-wrapper">
                        <label for="#">Длина судна <span>(LQA)</span></label>
                        <div class="form__input calc-section__float-value value">
                            <input type="number" v-model="form.fleetLength">
                        </div>
                    </div>
                    <div class="form__input-wrapper" :class="{disabled: checkFleetWidth}">
                        <label for="#">Ширина судна <span>(B)</span></label>
    
                        <div class="form__input calc-section__float-value value">
                            <input type="number" v-model="form.fleetWidth" :disabled="checkFleetWidth">
                        </div>
                    </div>
                    <div class="form__input-wrapper" :class="{disabled: checkFleetHeight}">
                        <label for="#">Высота борта судна <span>(D)</span></label>
                        <div class="form__input calc-section__float-value value">
                            <input type="number" v-model="form.fleetHeight" :disabled="checkFleetHeight">
                        </div>
                    </div>
                </div>
                <div class="form__group calc-section__date-wrapper calc-page__date-wrapper" v-if="datePickerInputOnCalcPageDestination">
                    <div class="form__input-wrapper calc-section__date">
                        <label for="">Дата прибытия</label>
                        <div class="form__input date">
                            <input type="text" @focus="datePickerFocus = true" :value="form.date">
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
        <div class="row align-items-center calc-page__volume">
            <div class="col-12 col-xl-6">
                <div class="calc-section__volume">
                    <p class="calc-section__volume-title">Объем судна <span>(V)</span>:</p>
                    <p class="calc-section__volume-value"><span>{{fleetVolume}}</span> м<sup>3</sup></p>
                </div>
            </div>
            <div class="col-12 col-xl-6">
                <small class="calc-section__formula">Высчитывается по формуле: (V=LQA*B*D)</small>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="form__group">
                    <div class="calc-section__checkbox">
                        <input type="checkbox" id="calc-section-form-checkbox" v-model="form.nonGoingFleet">
                        <label for="calc-section-form-checkbox">
                            Несамоходное судно или судно с неработающим ГД
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="!datePickerInputOnCalcPageDestination">
            <div class="col-12">
                <div class="form__group calc-section__date-wrapper">
                    <div class="form__input-wrapper calc-section__date">
                        <label for="">Дата прибытия</label>
                        <div class="form__input date">
                            <input type="text" @focus="datePickerFocus = true" :value="form.date">
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="calc-section__form-footer">
                    <div class="calc-section__result">
                        <p>Итоговая стоимость</p>
                        <p class="calc-section__result-value">
                            {{result}}р
                        </p>
                    </div>
                    <div class="calc-section__submit">
                        <button class="link">Оформить заявку</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
`

let formInfo = {}
function setFormInformation(formFields) {
    formInfo = {...formFields}
}
export function getFormInformation() {
    return formInfo
}
export function initCalc() {
    new Vue({
        el: '#calc',
        template: calcTemplate,
        data: {
            form:{
                fleetLength: '',
                fleetWidth: '',
                fleetHeight: '',
                nonGoingFleet: false,
                date: '',
            },
            datePickerFocus: false,
            highlightedDate: [],
            isHighlightedDateSelect: false,
            seasonCoefficient: 1,
            calcPage: false,
            windowWidth: 0
        },
        components: {
            datepicker: Datepicker
        },
        computed: {
            fleetVolume() {
                return (this.form.fleetLength * this.form.fleetWidth * this.form.fleetHeight).toFixed(2);
            },
            fleetCoefficient() {
                if (+this.form.fleetVolume < 30000) {
                    return 4.89
                } else if (+this.form.fleetVolume >= 30000 && +this.form.fleetVolume <= 100000) {
                    return 4.24
                } else return 3.69
            },
            nonGoingCoefficient() {
                if (this.form.nonGoingFleet) {
                    return 1.2
                } else {
                    return 1
                }
            },
            windCoefficient() {
                if (this.isHighlightedDateSelect) {
                    return 1.15
                } else {
                    return 1
                }
            },
            result() {
                const number = (this.fleetVolume *
                    this.fleetCoefficient *
                    this.nonGoingCoefficient *
                    this.windCoefficient *
                    this.seasonCoefficient * 2).toFixed(0)
                return new Intl.NumberFormat('ru-RU').format(number)
            },
            checkFleetWidth() {
                if (this.form.fleetLength === ''){
                    this.form.fleetWidth = ''
                }
                return this.form.fleetLength === ''
            },
            checkFleetHeight() {
                if (this.form.fleetWidth === ''){
                    this.form.fleetHeight = ''
                }
                return this.form.fleetWidth === ''
            },
            datePickerInputOnCalcPageDestination() {
                return this.calcPage && this.windowWidth >= xlWidth
            },
            valid(){
                return +this.result !== 0 && this.form.date !== ''
            }
        },
        methods: {
            formSubmit(){
              if (this.valid){
                  const formInfo ={
                      ...this.form,
                      url: location.href
                  }
                  setFormInformation(formInfo)
                  document.querySelector('.request-popup').classList.add('open')
              }
              else{
                  console.log('Ошибка')
              }
            },
            onResize() {
                this.windowWidth = window.innerWidth;
            },
            pickDate(date) {
                if (this.highlightedDate.find(v => v.getTime() === date.getTime())) {
                    this.isHighlightedDateSelect = true
                } else {
                    this.isHighlightedDateSelect = false
                }
                const month = date.getMonth()

                if(month >= 0 && month < 4){
                    this.seasonCoefficient = 1.2
                }

                this.datePickerFocus = false
            },
            getClasses(date) {
                if (this.highlightedDate !== []) {
                    if (this.highlightedDate.find(v => v.getTime() === date.getTime())) {
                        return "highlight";
                    }
                    return "";
                }
            }
        },
        created() {
            const that = this;
            document.addEventListener('click', function (event) {
                const datePicker = document.getElementsByClassName('calc-section__datepicker')[0];
                const datePickerInput = document.querySelector('.calc-section__date .form__input');
                const isClickInside = datePicker.contains(event.target)
                    || datePickerInput.contains(event.target);
                if (isClickInside === false) {
                    that.datePickerFocus = false;
                }
            })
            window.addEventListener('resize', this.onResize)
            this.onResize()
            let token = '';
            axios
                .get('http://bmba.sotbisite.beget.tech/ajax/get_token.php')
                .then(res => {
                    token = res.data
                    axios
                        .get('https://pfa.foreca.com/api/v1/forecast/daily/100478036?periods=14', {
                            headers: {
                                Authorization: 'Bearer ' + token
                            }
                        })
                        .then(res => {
                            this.highlightedDate = res.data.forecast.filter(data => data.maxWindSpeed >= 6);
                            this.highlightedDate = this.highlightedDate.map(data => {
                                const dateParts = data.date.split('-');
                                return new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
                            })
                        })
                })
        },
        mounted() {
            if (document.querySelector('.calc-page')) {
                this.calcPage = true;
            }
        },
        destroyed() {
            window.removeEventListener('resize', this.onResize);
        },
    })
}
