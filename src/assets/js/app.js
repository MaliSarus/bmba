import {changeHeaderStyle, hamburgerHandle} from "./modules/header";
import {addLinesBg,addTwoLinesBg} from './modules/lines-bg';

import fleetPrimarySliderInit from "./modules/fleet";
import partnersSliderInit from "./modules/partners";
import textAndSliderInit from "./modules/text-and-slider";
import historySliderInit from "./modules/history";
import initAccordion from "./modules/accordion";
import {videoContainerChangeWidth, videoPlayButtonHandle} from "./modules/video";
import sliderArrowsHandle from "./modules/slider-arrows";
import {servicesCardInit} from "./modules/services";
import documentsSliderInit from "./modules/documents";
import fslightbox from 'fslightbox'
import formInit from "./modules/form";
import {newsYearsSliderInit} from "./modules/news";
import {changeNewBgWidth} from "./modules/new";
import {initMap} from "./modules/geo";
import {initCalc} from "./modules/calc";

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
    if (isSet('.with-lines_two')) {
        const linesSections = document.querySelectorAll('.with-lines_two');
        linesSections.forEach((section) => {
            addTwoLinesBg(section);
        })
    }


    if (isSet('.fleet-primary-section')) {
        fleetPrimarySliderInit()
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
    if (isSet('.services-section')) {

        servicesCardInit()
    }
    if (isSet('form')) {
        formInit()
    }
    if (isSet('.documents-section')) {
        documentsSliderInit();
    }
    if (isSet('.news-section')){
        newsYearsSliderInit()
    }
    if (isSet('.new-section')){
        changeNewBgWidth()
        window.addEventListener('resize', changeNewBgWidth)
    }
    if (isSet('.geo-section')){
        initMap()
    }
    if (isSet('.calc-section')){
        initCalc()
    }
})

window.addEventListener('scroll', function () {
    changeHeaderStyle();
})

