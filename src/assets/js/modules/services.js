import {xlWidth} from "./window-width-values";

function servicesCardSetHeight({servicesTitles, servicesHiddenText, servicesContent}) {
    let minTitleHeight = servicesTitles[1].offsetHeight;
    for (let i = 0; i < servicesTitles.length; i++) {
        minTitleHeight = servicesTitles[i].offsetHeight < minTitleHeight ?
            servicesTitles[i].offsetHeight
            : minTitleHeight
    }
    servicesTitles.forEach(title => {
        title.style.maxHeight = minTitleHeight + 'px';
    })

    let maxTextHeight = 0;
    for (let i = 0; i < servicesHiddenText.length; i++) {
        maxTextHeight = servicesHiddenText[i].offsetHeight > maxTextHeight ?
            servicesHiddenText[i].offsetHeight
            : maxTextHeight
    }

    servicesHiddenText.forEach(text => {
        text.style.height = maxTextHeight + 'px';
    })

    servicesContent.forEach(elem => {
        const offset = elem.querySelector('.services-section__title').offsetHeight
        elem.style.transform = `translateY(calc(100% - ${offset}px))`;
    })
}

function servicesCardDeletHeight({servicesTitles, servicesHiddenText, servicesContent}){
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
    const servicesSection = document.querySelector('.services-section')
    const elementsToSetHeight = {
        servicesTitles: document.querySelectorAll('.services-section__title'),
        servicesHiddenText: document.querySelectorAll('.services-section__service-hidden'),
        servicesContent: document.querySelectorAll('.services-section__service-content')
    }
    if (window.innerWidth >= xlWidth) {
        servicesCardSetHeight(elementsToSetHeight)
    }

    servicesLink.forEach(link => {
        link.addEventListener('mouseover', function () {
            const backgroundImage = this.dataset.bg;
            servicesSection.style.backgroundImage = `url("${backgroundImage}")`;
        })
    })
    window.addEventListener('resize', function () {
        if (window.innerWidth >= xlWidth) {
            servicesCardSetHeight(elementsToSetHeight)
        } else {
            servicesCardDeletHeight(elementsToSetHeight)
        }
    })
}