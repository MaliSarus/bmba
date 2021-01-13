import {changeHeaderStyle, hamburgerHandle} from "./modules/header";
import addLinesBg from './modules/lines-bg';
import fleetPimarySliderInit from "./modules/fleet";
import partnersSliderInit from "./modules/partners";
import textAndSliderInit from "./modules/text-and-slider";
import historySliderInit from "./modules/history";
import initAccordion from "./modules/accordion";
import {videoContainerChangeWidth, videoPlayButtonHandle} from "./modules/video";
import sliderArrowsHandle from "./modules/slider-arrows";
import {servicesCardInit} from "./modules/services";

// import homePageTopInit from "./modules/home-page-top";




function isSet(element) {
    return document.querySelectorAll(element).length !== 0;
}

document.addEventListener("DOMContentLoaded", function (event) {
    changeHeaderStyle();
    hamburgerHandle();

    if (isSet('.slider-arrows')) {
        sliderArrowsHandle()
    }


    if (isSet('.with-lines')) {
        const linesSections = document.querySelectorAll('.with-lines');
        linesSections.forEach((section) => {
            addLinesBg(section);
        })
    }


    if (isSet('.fleet-primary-section')) {
        fleetPimarySliderInit()
    }
    if (isSet('.video-section')) {
        videoContainerChangeWidth();
        videoPlayButtonHandle()
        window.addEventListener('resize', videoContainerChangeWidth)
    }
    if (isSet('.partners-section')) {
        partnersSliderInit()
    }
    if (isSet('.text-and-slider-section')) {
        textAndSliderInit();
    }
    if (isSet('.history-section')) {
        historySliderInit();
    }
    if (isSet('.faq-section')) {
        const acc = document.querySelectorAll('.accordion .accordion__title');
        initAccordion(acc)
    }
    if (isSet('.services-section')){

        servicesCardInit()
    }
})

window.addEventListener('scroll', function () {
    changeHeaderStyle();
})

