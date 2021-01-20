import {xlWidth} from "./window-width-values";

export function changeNewBgWidth() {
    const newContent = document.querySelector('.new-section__content');
    const newBackground = document.querySelector('.new-section__background');
    if (window.innerWidth >= xlWidth) {
        newBackground.style.width = newContent.getBoundingClientRect().left + 'px'
    }
    else {
        newBackground.removeAttribute('style')
    }
}