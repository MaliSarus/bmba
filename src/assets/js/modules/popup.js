import {getFormInformation} from "./calc";
import fadeOutEffect from "./fadeOut";



export default function popupInit() {
    const successPopupCloseButton = document.querySelector('.success-popup__close');
    successPopupCloseButton.addEventListener('click', function () {
        const successPopup = document.querySelector('.success-popup')
        fadeOutEffect(successPopup, function () {
            successPopup.classList.remove('open');
            successPopup.removeAttribute('style');
            document.body.classList.remove('hidden')
        })
    })

    const requestPopup = document.querySelector('.request-popup')
    requestPopup.addEventListener('click', function (event) {
        const requestPopupBlock = this.querySelector('.request-popup__block')
        const isClickInside = requestPopupBlock.contains(event.target);

        if (!isClickInside) {
            fadeOutEffect(requestPopup, function () {
                requestPopup.classList.remove('open');
                requestPopup.removeAttribute('style');
                document.body.classList.remove('hidden')
            })
        }
    })
}