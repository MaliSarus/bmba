import {xlWidth} from "./window-width-values";

function servicesCardSetHeight() {

    const servicesContent = document.querySelectorAll('.services-section__service-content')
    servicesContent.forEach(elem => {
        const elemTitle = elem.querySelector('.services-section__title')
        const offset = elemTitle.offsetHeight;
        elem.style.transform = `translateY(calc(100% - ${offset}px))`;
    })
}

function servicesCardDeletHeight() {

    const servicesTitles = document.querySelectorAll('.services-section__title');
    const servicesHiddenText = document.querySelectorAll('.services-section__service-hidden');
    const servicesContent = document.querySelectorAll('.services-section__service-content');

    servicesHiddenText.forEach(text => {
        text.removeAttribute('style');
    })
    servicesTitles.forEach(title => {
        title.removeAttribute('style');
    })
    servicesContent.forEach(elem => {
        elem.removeAttribute('style');
    })
}

export function servicesCardInit() {

    const servicesLink = document.querySelectorAll('.services-section__service a')
    const servicesSectionBg = document.querySelector('.services-section__background')

    if (window.innerWidth >= xlWidth) {
        window.addEventListener('load', function () {
            servicesCardSetHeight()
        })
    }

    servicesLink.forEach(link => {
        link.addEventListener('mouseover', function () {
            const backgroundImage = this.dataset.bg;
            servicesSectionBg.style.backgroundImage = `url("${backgroundImage}")`;
        })
    })
    window.addEventListener('resize', function () {
        console.log('resize')
        if (window.innerWidth >= xlWidth) {
            servicesCardSetHeight()
        } else {
            servicesCardDeletHeight()
        }
    })
}