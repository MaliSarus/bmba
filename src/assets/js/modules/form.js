import {getFormInformation} from "./calc";
import getParents from "./getParents";
import fadeOutEffect from "./fadeOut";

function requestPopupSubmit(form){
    const formInfo = {
        ...getFormInformation(),
        name: form.querySelector('.form__input.name input').value,
        email: form.querySelector('.form__input.email input').value,
        phone: form.querySelector('.form__input.phone input').value,
    };
    const requestPopup = getParents(form,document.querySelector('.request-popup'))
    const successPopup = document.querySelector('.success-popup');
    fadeOutEffect(requestPopup, function () {
        form.reset();
        requestPopup.classList.remove('open');
        requestPopup.removeAttribute('style');
        successPopup.classList.add('open')
    })
}

function requestSectionSubmit(form){
    const formInfo = {
        name: form.querySelector('.form__input.name input').value,
        email: form.querySelector('.form__input.email input').value,
        phone: form.querySelector('.form__input.phone input').value,
    };
    form.reset();
    document.querySelector('.success-popup').classList.add('open')
}

export default function formInit() {
    const mailPattern = /^[\.a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
    const formMailInput = document.querySelectorAll('form input[type="email"]');
    const formNameInput = document.querySelectorAll('form .form__input.name input[type="text"]');
    const formPhoneInput = document.querySelectorAll('form input[type="tel"]');
    const formInputs = document.querySelectorAll('form input[required]');
    const forms = document.querySelectorAll('form');

    formPhoneInput.forEach(phoneInput=>{
        phoneInput.addEventListener('input', function () {
            this.value = this.value.replace(/[^-\d\+]/,'')
        })
    })
    formInputs.forEach(input => {
        // input.addEventListener('focus', function () {
        //     const inputWrapper = this.parentNode
        //     inputWrapper.classList.add('invalid')
        // })
        input.addEventListener('input', function () {
            const inputVal = this.value;
            const inputWrapper = this.parentNode;
            if(inputVal !== ''){
                inputWrapper.classList.remove('invalid');
                inputWrapper.classList.add('valid')
            }
            else{
                inputWrapper.classList.remove('valid');
            }
        })
    })

    formMailInput.forEach(mailInput => {
        mailInput.addEventListener('input', function () {
            const inputVal = this.value;
            const inputWrapper = this.parentNode
            if (inputVal.search(mailPattern) == 0) {
                inputWrapper.classList.remove('invalid');
                inputWrapper.classList.add('valid');
            } else {
                inputWrapper.classList.remove('valid');
            }
        });
    })

    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const inputs = Array.prototype.slice.call(this.querySelectorAll('.form__input'));
            const invalidInputs = inputs.filter(input => {
                return !input.classList.contains('valid')
            })
            const invalid =  invalidInputs.length > 0;
            if (!invalid){
                if (form.classList.contains('request-popup__form')){
                   requestPopupSubmit(form)
                }
                if (form.classList.contains('request-section__form')){
                    requestSectionSubmit(form)
                }
            }
            else {
                invalidInputs.forEach(input=>{
                    input.classList.add('invalid')
                })
            }
        })
    })
}