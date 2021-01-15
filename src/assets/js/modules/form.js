export default function formInit() {
    const mailPattern = /^[\.a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
    const formMailInput = document.querySelectorAll('form input[type="email"]');
    const formNameInput = document.querySelectorAll('form .form__input.name input[type="text"]');
    const formPhoneInput = document.querySelectorAll('form input[type="tel"]');
    const formInputs = document.querySelectorAll('form input');
    const forms = document.querySelectorAll('form');


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
                console.log('success')
            }
            else {
                invalidInputs.forEach(input=>{
                    input.classList.add('invalid')
                })
            }
        })
    })
}