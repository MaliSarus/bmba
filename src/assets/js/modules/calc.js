import Vue from 'vue/dist/vue.min.js'
import axios from 'axios'
import Datepicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/ru';
const baseURL = 'https://bmba-ustluga.ru/ajax/get_forecast.php'
let formInfo = {}
const months = ['янв.', 'фев.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'ноя.', 'дек.'];

function setFormInformation(formFields) {
    formInfo = {...formFields }
}

export function getFormInformation() {
    return formInfo
}

const calcTemplate = `
 <div class="calc-section__block">
     <div class="calc-section__datepicker" :class="{open:datePickerFocus}">
        <div class="calc-section__datepicker-title">выбор даты прибытия</div>
        <datepicker 
            inline 
            v-model="form.date" 
            valueType="DD.MM.YYYY" 
            @pick="pickDate" 
            :get-classes="getClasses"
            :disabled-date="(date) => date < new Date()"
        />
        <div class="calc-section__datepicker-add">
            <p>Ветер свыше 14 м/с</p>
            <p>Коэффициент 1,15</p>
        </div>
        <div class="calc-section__datepicker-add winter">
            <p>Зимняя навигация</p>
            <p>Коэффициент 1,2</p>
        </div>
        <button class="link success-popup__close calc-section__datepicker-close" @click="datePickerFocus = false">Отмена</button>
    </div>
   
    <div class="calc-section__title-wrapper">
        <div class="calc-section__title text">
            <div class="block-title" data-title-num="03">Калькулятор</div>
            <h1 v-if="calcPage">Расчет стоимости</h1>
            <h2 v-else>Расчет стоимости</h2>
            <p>Заполните поля, чтобы рассчитать стоимость услуг буксирного флота</p>
        </div>
         <div
             class="calc-section__weather weather" 
             v-show="windowWidth < 1200"
         >
            <div class="weather__block">
                <div class="weather__date">
                    <div class="weather__day">{{weather.day}}</div>
                    <div class="weather__month">{{weather.month}}</div>
                </div>
                <div class="weather__values">
                    <div class="weather__temp">Температура <span class="weather__value">{{weather.temp}} <sup>o</sup></span></div>
                    <div class="weather__wind">Ветер, м/с <span class="weather__value">{{weather.wind}}</span></div>
                </div>
            </div>
         </div>
    </div>
    <form action="#" class="calc-section__form form" @submit.prevent="formSubmit">
        <div class="row" >
            <div class="col-12" :class="{
            'd-flex': calcPage,
            'justify-content-between': calcPage,
            'flex-wrap':calcPage,
            }">
                <div class="form__group calc-section__float-values">
                    <div class="form__input-wrapper">
                        <label for="calc-fleet-length">Длина судна <span>(LQA)</span></label>
                        <div 
                            class="form__input calc-section__float-value value required" 
                            @click="focusInput" 
                            :class="{valid: form.fleetLength !== ''}"
                        >
                            <input 
                                id="calc-fleet-length" 
                                type="text" 
                                placeholder="Ввод..." 
                                v-model="form.fleetLength"  
                                @keyup="allowNum($event)"
                            >
                        </div>
                    </div>
                    <div 
                        class="form__input-wrapper" 
                        :class="{disabled: checkFleetWidth}"
                    >
                        <label for="calc-fleet-width">Ширина судна <span>(B)</span></label>
    
                        <div 
                            class="form__input calc-section__float-value value required" 
                            :class="{valid: form.fleetWidth !== ''}"
                            @click="focusInput"
                        >
                            <input 
                                id="calc-fleet-width" 
                                type="text" 
                                placeholder="Ввод..." 
                                v-model="form.fleetWidth" 
                                :disabled="checkFleetWidth" 
                                @keyup="allowNum($event)"
                            >
                        </div>
                    </div>
                    <div 
                        class="form__input-wrapper" 
                        :class="{disabled: checkFleetHeight}"
                    >
                        <label for="calc-fleet-height">Высота борта судна <span>(D)</span></label>
                        <div 
                            class="form__input calc-section__float-value value required" 
                            :class="{valid: form.fleetHeight !== ''}"
                            @click="focusInput"
                        >
                            <input 
                                id="calc-fleet-height" 
                                type="text" 
                                placeholder="Ввод..." 
                                v-model="form.fleetHeight" 
                                :disabled="checkFleetHeight" 
                                @keyup="allowNum($event)"
                            >
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
                <div class="form__group form__checkbox">
                    <div class="calc-section__checkbox">
                        <input 
                            type="checkbox" 
                            id="calc-section-form-checkbox" 
                            v-model="form.nonGoingFleet"
                        >
                        <label for="calc-section-form-checkbox">
                            Несамоходное судно или судно с неработающим ГД
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="form__group calc-section__date-wrapper">
                    <div class="form__input-wrapper calc-section__date">
                        <label for="calc-date">Дата прибытия</label>
                        <div 
                            class="form__input date required" 
                            :class="{valid: form.date !== ''}"
                            @click="focusInput"
                        >
                            <input 
                                id="calc-date" 
                                type="text" 
                                placeholder="Выбрать дату" 
                                @focus="datePickerFocus = true" 
                                :value="form.date"
                                readonly
                            >
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
                            <span v-if="+result !== 0">~</span>{{result}} <span v-if="+result !== 0">&#8381</span>
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
            form: {
                fleetLength: '',
                fleetWidth: '',
                fleetHeight: '',
                nonGoingFleet: false,
                date: '',
            },
            weather: {
                day: new Date().getDate(),
                month: months[new Date().getMonth()],
                temp: '...',
                wind: '...'
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
                if (this.floatFleetLength && this.floatFleetWidth && this.floatFleetHeight) {
                    const value = (this.floatFleetLength *
                            this.floatFleetWidth *
                            this.floatFleetHeight)
                        .toFixed(2);
                    return new Intl.NumberFormat('ru-RU').format(value)
                } else {
                    return 0
                }
            },
            floatFleetLength() {
                const val = parseFloat(this.form.fleetLength.replace(',', '.'));
                if (val > 0) {
                    return val
                } else {
                    this.form.fleetLength = ''
                    return 0
                }
            },
            floatFleetWidth() {
                const val = parseFloat(this.form.fleetWidth.replace(',', '.'));
                if (val > 0) {
                    return val
                } else {
                    this.form.fleetWidth = ''
                    return 0
                }
            },
            floatFleetHeight() {
                const val = parseFloat(this.form.fleetHeight.replace(',', '.'));
                if (val > 0) {
                    return val
                } else {
                    this.form.fleetHeight = ''
                    return 0
                }
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
                const fleetVolume = (this.floatFleetLength *
                        this.floatFleetWidth *
                        this.floatFleetHeight)
                    .toFixed(2);
                const number = (fleetVolume *
                    this.fleetCoefficient *
                    this.nonGoingCoefficient *
                    this.windCoefficient *
                    this.seasonCoefficient * 2).toFixed(0)
                return new Intl.NumberFormat('ru-RU').format(number)
            },
            checkFleetWidth() {
                if (this.form.fleetLength === '') {
                    this.form.fleetWidth = ''
                }
                return this.form.fleetLength === ''
            },
            checkFleetHeight() {
                if (this.form.fleetWidth === '') {
                    this.form.fleetHeight = ''
                }
                return this.form.fleetWidth === ''
            },
            valid() {
                return +this.result !== 0 && this.form.date !== ''
            }
        },
        methods: {
            formSubmit() {
                if (this.valid) {
                    const formInfo = {
                        ...this.form,
                        total: this.result,
                        url: location.href
                    }
                    setFormInformation(formInfo)
                    document.querySelector('.request-popup').classList.add('open')
                    document.body.classList.add('hidden')
                } else {
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

                if (month >= 0 && month < 4 || month === 11) {
                    this.seasonCoefficient = 1.2
                } else {
                    this.seasonCoefficient = 1
                }

                this.datePickerFocus = false
            },
            getClasses(date) {
                const today = new Date;
                let result = [];

                if (this.highlightedDate !== []) {
                    if (this.highlightedDate.find(v => v.getTime() === date.getTime())) {
                        result.push("highlight");
                    }
                }
                if (date.getMonth() >= 0 && date.getMonth() < 4 || date.getMonth() === 11) {
                    result.push("winter")
                }
                return result.join(' ')

            },
            allowNum(event) {
                const keyCode = event.key;
                const patternOne = /^\d+(\.?)\d*$/g;
                const patternTwo = /^\d+(,?)\d*$/g;
                const value = event.currentTarget.value;
                if (keyCode !== ',' && keyCode !== '.' && isNaN(keyCode) && event.keyCode > 9) { // numbers, comma and control keys
                    event.preventDefault();
                }
                if (!value.match(patternOne) && !value.match(patternTwo)) {
                    event.currentTarget.value = value.slice(0, -1);
                }
            },
            focusInput(event) {
                const input = event.currentTarget.querySelector('input');
                input.focus()
            }
        },
        created() {
            const that = this;
            document.addEventListener('click', function(event) {
                const datePicker = document.getElementsByClassName('calc-section__datepicker')[0];
                const datePickerInput = document.querySelector('.calc-section__date .form__input');
                const isClickInside = datePicker.contains(event.target) ||
                    datePickerInput.contains(event.target);
                if (isClickInside === false) {
                    that.datePickerFocus = false;
                }
            })
            window.addEventListener('resize', this.onResize)
            this.onResize();
            let token = '';

            axios.get(baseURL + '?type=current')
                .then(res => {
                    const current = res.data.current;
                    this.weather.temp = current.temperature;
                    this.weather.wind = current.windSpeed;
                    document.querySelector('.weather__day').textContent = this.weather.day;
                    document.querySelector('.weather__month').textContent = this.weather.month;
                    document.querySelector('.weather__temp .weather__value').innerHTML = this.weather.temp + '<sup>o</sup>';
                    document.querySelector('.weather__wind .weather__value').textContent = this.weather.wind;
                })
                .catch(rej => {
                    console.log(rej)
                })
            axios.get(baseURL + '?type=daily')
                .then(res => {
                    const forecast = res.data.forecast;
                    this.highlightedDate = forecast.filter(data => data.maxWindSpeed >= 14);
                    this.highlightedDate = this.highlightedDate.map(data => {
                        const dateParts = data.date.split('-');
                        return new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
                    })
                })
                .catch(rej => {
                    console.log(rej)
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
        watch: {
            datePickerFocus(val) {
                if (val) {
                    document.body.classList.add('hidden')
                } else {
                    document.body.classList.remove('hidden')
                }
            }
        }
    })
}