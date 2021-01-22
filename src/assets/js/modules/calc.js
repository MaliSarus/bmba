import Vue from 'vue/dist/vue.js'
import axios from 'axios'
import Datepicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/ru';

const calcTemplate = `
 <div class="calc-section__block "">
     <div class="calc-section__datepicker" :class="{open:datePickerFocus}">
      <datepicker inline v-model="date" valueType="DD.MM.YYYY" @pick="pickDate" />
    </div>
   
    <div class="calc-section__title text">
        <h2>Рассчет стоимости</h2>
        <p>Заполните поля, чтобы рассчитать стоимость услуги</p>
    </div>
    <form action="#" class="calc-section__form form">
        <div class="row">
            <div class="col-12">
                <div class="form__group calc-section__float-values">
                    <div class="form__input-wrapper">
                        <label for="#">Длина судна <span>(LQA)</span></label>
                        <div class="form__input calc-section__float-value value">
                            <input type="text" v-model.number="fleetLength">
                        </div>
                    </div>
                    <div class="form__input-wrapper" :class="{disabled: checkFleetWidth}">
                        <label for="#">Ширина судна <span>(B)</span></label>
    
                        <div class="form__input calc-section__float-value value">
                            <input type="text" v-model.number="fleetWidth" :disabled="checkFleetWidth">
                        </div>
                    </div>
                    <div class="form__input-wrapper" :class="{disabled: checkFleetHeight}">
                        <label for="#">Высота борта судна <span>(D)</span></label>
                        <div class="form__input calc-section__float-value value">
                            <input type="text" v-model.number="fleetHeight" :disabled="checkFleetHeight">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row align-items-center">
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
                        <input type="checkbox" id="calc-section-form-checkbox" v-model="nonGoingFleet">
                        <label for="calc-section-form-checkbox">
                            Несамоходное судно или судно с неработающим ГД
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="form__group">
                    <div class="form__input-wrapper calc-section__date">
                        <label for="">Дата прибытия</label>
                        <div class="form__input date">
                            <input type="text" @focus="datePickerFocus = true" :value="date">
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

export function initCalc() {
    new Vue({
        el: '#calc',
        template: calcTemplate,
        data: {
            fleetLength: '',
            fleetWidth: '',
            fleetHeight: '',
            nonGoingFleet: false,
            datePickerFocus: false,
            date: '',
        },
        components: {
            datepicker: Datepicker
        },
        computed: {
            fleetVolume() {
                return this.fleetLength * this.fleetWidth * this.fleetHeight;
            },
            fleetCoefficient() {
                if (+this.fleetVolume < 30000) {
                    return 4.89
                } else if (+this.fleetVolume >= 30000 && +this.fleetVolume <= 100000) {
                    return 4.24
                } else return 3.69
            },
            nonGoingCoefficient() {
                if (this.nonGoingFleet) {
                    return 1.2
                } else {
                    return 1
                }
            },
            windCoefficient() {
                return 1
            },
            seasonCoefficient() {
                return 1
            },
            result() {
                const number = this.fleetVolume *
                    this.fleetCoefficient *
                    this.nonGoingCoefficient *
                    this.windCoefficient *
                    this.seasonCoefficient * 2
                return new Intl.NumberFormat('ru-RU').format(number)
            },
            checkFleetWidth() {
                return this.fleetLength === ''
            },
            checkFleetHeight() {
                return this.fleetWidth === ''
            }
        },
        methods: {
            pickDate() {
                this.datePickerFocus = false
            }
        },
        mounted() {
            const that = this
            document.addEventListener('click', function (event) {
                const datePicker = document.getElementsByClassName('calc-section__datepicker')[0];
                const datePickerInput = document.querySelector('.calc-section__date .form__input');
                const isClickInside = datePicker.contains(event.target)
                    || datePickerInput.contains(event.target);
                if (isClickInside === false) {
                    that.datePickerFocus = false;
                }
            })

            axios
                .get('https://pfa.foreca.com/api/v1/location/search/Ust\'-Luga?lang=ru',{
                    headers:{
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZmEuZm9yZWNhLmNvbVwvYXV0aG9yaXplXC90b2tlbiIsImlhdCI6MTYxMTMxMTkxMCwiZXhwIjoxNjExMzE5MTEwLCJuYmYiOjE2MTEzMTE5MTAsImp0aSI6IjhkNTkwMzE0MTJiMjg3NDUiLCJzdWIiOiJibWJhIiwiZm10IjoiWERjT2hqQzQwK0FMamxZVHRqYk9pQT09In0.iOpiDYJvOuT4eXKTvIzGvCFOPKqOchQ8198buOQf_hY'
                    }
                })
                .then(res=>{
                    console.log(res)
                })
        }
    })
}
