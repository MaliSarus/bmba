import { getFormInformation } from "./calc";
import getParents from "./getParents";
import fadeOutEffect from "./fadeOut";
import { offsetTop } from "./helpers";
import axios from "axios";

const baseURL = 'https://bmba-ustluga.ru/ajax/form.php'
function resetForm(form) {
    const validInputs = form.querySelectorAll('.valid');
    validInputs.forEach(input=>{
        input.classList.remove('valid');
    })
    form.reset()
}
function requestPopupData(form) {
    return {
        ...getFormInformation(),
        name: form.querySelector('.form__input.name input').value,
        email: form.querySelector('.form__input.email input').value,
        phone: form.querySelector('.form__input.phone input').value,
        type: 'request'
    };
}

function requestPopupSuccess(form) {
    const requestPopup = getParents(form, document.querySelector('.request-popup'))
    const successPopup = document.querySelector('.success-popup');
    fadeOutEffect(requestPopup, function() {
        resetForm(form)
        requestPopup.classList.remove('open');
        requestPopup.removeAttribute('style');
        successPopup.classList.add('open')
    })
}

function requestSectionData(form) {
    return {
        name: form.querySelector('.form__input.name input').value,
        email: form.querySelector('.form__input.email input').value,
        phone: form.querySelector('.form__input.phone input').value,
        type: 'application'
    }
}

function requestSectionSuccess(form) {
    resetForm(form)
    document.querySelector('.success-popup').classList.add('open')
    document.body.classList.add('hidden')
}

function popupError(form) {
    form.reset();
    document.querySelector('.wrong-popup').classList.add('open')
    document.body.classList.add('hidden')
}

export default function formInit() {
    const mailPattern = /^[\.a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
    const formMailInput = document.querySelectorAll('form input[type="email"]');
    const formNameInput = document.querySelectorAll('form .form__input.name input[type="text"]');
    const formPhoneInput = document.querySelectorAll('form input[type="tel"]');
    const formRequiredInputs = document.querySelectorAll('form .form__input.required input');
    const forms = document.querySelectorAll('form');

    formPhoneInput.forEach(phoneInput => {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^-\d\+]/, '')
        })
    })
    formRequiredInputs.forEach(input => {
        input.addEventListener('input', function() {
            const inputVal = this.value;
            const inputWrapper = this.parentNode;
            if (inputVal !== '') {
                inputWrapper.classList.remove('invalid');
                inputWrapper.classList.add('valid')
            } else {
                inputWrapper.classList.remove('valid');
            }
        })
    })

    formMailInput.forEach(mailInput => {
        mailInput.addEventListener('input', function() {
            // const regexp = new RegExp('[А-Яа-я]')
            // if(regexp.test(this.value)){
            //     this.value = this.value.replace(regexp,'')
            // }
            const inputVal = this.value;
            const inputWrapper = this.parentNode
            if (inputVal.search(mailPattern) === 0) {
                inputWrapper.classList.remove('invalid');
                inputWrapper.classList.add('valid');
            } else {
                inputWrapper.classList.remove('valid');
            }
        });
    })

    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const inputs = Array.prototype.slice.call(this.querySelectorAll('.form__input.required'));
            const invalidInputs = inputs.filter(input => {
                return !input.classList.contains('valid');
            })
            const invalid = invalidInputs.length > 0;
            if (!invalid) {
                if (!form.classList.contains('calc-section__form')) {
                    let data;
                    if (form.classList.contains('request-popup__form')) {
                        data = requestPopupData(form);
                    }
                    if (form.classList.contains('request-section__form')) {
                        data = requestSectionData(form);
                    }
                    console.log(data.type)
                    const dataType = data.type;
                    axios
                        .post(baseURL, data)
                        .then(res => {
                            console.log(res)
                            if (res.status === 200 && res.data.status !== 'error') {
                                switch (dataType) {
                                    case "request":
                                        requestPopupSuccess(form);
                                    case "application":
                                        requestSectionSuccess(form);
                                }
                            } else {
                                popupError(form);
                            }
                        })
                }

            } else {
                invalidInputs.forEach(input => {
                    input.classList.add('invalid')
                })
                const elementPosition = offsetTop(invalidInputs[0]);
                let headerOffset = document.querySelector('header').offsetHeight;
                let offsetPosition = elementPosition - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        })
    })
}