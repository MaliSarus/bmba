import {xlWidth} from "./window-width-values";

function servicesCardSetHeight({servicesTitles, servicesHiddenText, servicesContent}) {
    let minTitleHeight = 0;
    // for (let i = 0; i < servicesTitles.length; i++) {
    //     minTitleHeight = servicesTitles[i].offsetHeight > minTitleHeight ?
    //         servicesTitles[i].offsetHeight
    //         : minTitleHeight
    // }
    // servicesTitles.forEach(title => {
    //     title.style.height = minTitleHeight + 'px';
    // })
    //
    // let maxTextHeight = 0;
    // for (let i = 0; i < servicesHiddenText.length; i++) {
    //     maxTextHeight = servicesHiddenText[i].offsetHeight > maxTextHeight ?
    //         servicesHiddenText[i].offsetHeight
    //         : maxTextHeight
    // }
    //
    // servicesHiddenText.forEach(text => {
    //     text.style.height = maxTextHeight + 'px';
    // })

    servicesContent.forEach((elem, index) => {
        window.addEventListener('load',function () {
            const elemTitle = elem.querySelector('.services-section__title')
            const offset = elemTitle.offsetHeight;
            console.log(`title[${index}] height: `, offset);
            elem.style.transform = `translateY(calc(100% - ${offset}px))`;
            elemTitle.style.transform = `translateY(-140px)`

        })
    })
}

function servicesCardDeletHeight({servicesTitles, servicesHiddenText, servicesContent}) {
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
            servicesSectionBg.style.backgroundImage = `url("${backgroundImage}")`;
        })
    })
    // window.addEventListener('resize', function () {
    //     if (window.innerWidth >= xlWidth) {
    //         servicesCardSetHeight(elementsToSetHeight)
    //     } else {
    //         servicesCardDeletHeight(elementsToSetHeight)
    //     }
    // })
}