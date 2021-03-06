import {changeHeaderStyle, hamburgerHandle} from "./modules/header";
import {addLinesBg, addTwoLinesBg} from './modules/lines-bg';

import fleetPrimarySliderInit from "./modules/fleet";
import partnersSliderInit from "./modules/partners";
import textAndSliderInit from "./modules/text-and-slider";
import historySliderInit from "./modules/history";
import initAccordion from "./modules/accordion";
import {videoContainerChangeWidth, videoPlayButtonHandle, videoSnippetPlayButtonHandle} from "./modules/video";
import sliderArrowsHandle from "./modules/slider-arrows";
import {servicesCardInit} from "./modules/services";
import documentsSliderInit from "./modules/documents";
import formInit from "./modules/form";
import {newsYearsSliderInit} from "./modules/news";
import {changeNewBgWidth} from "./modules/new";
import {initMap} from "./modules/geo";
import {initCalc} from "./modules/calc";
import {lgWidth} from "./modules/window-width-values";
import popupInit from "./modules/popup";
import initFleetSection, {initScrollBar} from "./modules/fleet-section";
import placeCircleElement from "./modules/circle-menu";
import {scrollTo, setFirstSectionOffset, setHeightToMobileVh} from "./modules/helpers";
import contactsInit from "./modules/contacts";
import initSlider from "./modules/slider";

// import homePageTopInit from "./modules/home-page-top";


function isSet(element) {
    return document.querySelectorAll(element).length !== 0;
}

document.addEventListener("DOMContentLoaded", function (event) {
    if (isSet('.calc-section')) {
        initCalc()
        const datepicker = document.querySelector('.calc-section__datepicker')
        document.querySelector('main').appendChild(datepicker)
    }
    if (isSet('.link')) {
        document.querySelectorAll('.link').forEach(link => {
            link.insertAdjacentHTML('beforeend', `<span></span><span class="hover"></span>`)
        })
    }
    changeHeaderStyle();
    hamburgerHandle();

    popupInit();
    setHeightToMobileVh()


    if (isSet('.scrollable')) {
        const scrollableElements = document.querySelectorAll('.scrollable');
        scrollableElements.forEach(el => {
            el.addEventListener('click', scrollTo)
        })
    }

    if (isSet('.circle')) {
        placeCircleElement()
    }

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

    const sections = document.querySelectorAll('section')
    sections.forEach(section => {
        const order = section.getAttribute('data-order');
        const sectionBlockTitle = section.querySelectorAll('.block-title');
        sectionBlockTitle.forEach(title => {
            const formatOrder = order < 10 ? '0' + order : order
            title.setAttribute('data-title-num', formatOrder)
        })

    })


    if (isSet('.fleet-primary-section')) {
        fleetPrimarySliderInit()
    }
    if (isSet('.video-section')) {

        videoContainerChangeWidth();
        window.addEventListener('resize', videoContainerChangeWidth)
        videoPlayButtonHandle()
    }

    if (isSet('.video')) {
        videoSnippetPlayButtonHandle()
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
    if (isSet('.accordion')) {
        const acc = document.querySelectorAll('.accordion .accordion__title');
        initAccordion(acc)
    }
    if (isSet('.services-section')) {

        servicesCardInit()
    }
    if (isSet('form')) {
        formInit()
    }
    if (isSet('.documents-section__slider')) {
        documentsSliderInit();
    }
    if (isSet('.news-section')) {
        newsYearsSliderInit()
    }
    if (isSet('.new-section')) {
        changeNewBgWidth()
        window.addEventListener('resize', changeNewBgWidth)
    }
    if (isSet('.geo-section')) {
        initMap()
        const hideInfoButton = document.querySelector('.geo-section__info-hide');
        const infoBlock = document.querySelector('.geo-section__info');
        const openButton = document.querySelector('.geo-section__info-open');
        if (infoBlock.classList.contains('hide')) {
            if (window.innerWidth < lgWidth) {
                infoBlock.style.marginTop = (infoBlock.offsetHeight * -1) + 'px';
            }
        }
        hideInfoButton.addEventListener('click', function () {
            infoBlock.classList.add('hide');
            openButton.classList.remove('active')
            if (window.innerWidth < lgWidth) {
                infoBlock.style.marginTop = (infoBlock.offsetHeight * -1) + 'px';
            }
        })
        openButton.addEventListener('click', function () {
            this.classList.add('active')
            infoBlock.classList.remove('hide');
            if (window.innerWidth < lgWidth) {
                infoBlock.removeAttribute('style');
            }
        })
        window.addEventListener('resize', function () {
            if (window.innerWidth < lgWidth) {
                if (infoBlock.classList.contains('hide')) {
                    infoBlock.style.marginTop = (infoBlock.offsetHeight * -1) + 'px';
                }
            } else {
                if (infoBlock.classList.contains('hide')) {
                    infoBlock.removeAttribute('style')
                }
            }
        })
    }

    if (isSet('.fleet-section')) {
        initFleetSection()
        initScrollBar()
    }

    if (isSet('.first-section')) {
        const firstSection = document.querySelectorAll('.first-section')
        firstSection.forEach(section => {
            setFirstSectionOffset(section)
        })
        window.addEventListener('resize', function () {
            firstSection.forEach(section => {
                setFirstSectionOffset(section)
            })
        })
    }
    if (isSet('.contacts-section')) {
        contactsInit();
    }
    if (isSet('.table')) {
        window.addEventListener("load resize", function () {
            const tables = document.querySelectorAll('.table')
            tables.forEach(table => {
                const scrollWidth = table.querySelector('.tbl-content').offsetWidth - table.querySelector('.tbl-content table').offsetWidth;
                table.querySelector('.tbl-header').style.paddingRight = scrollWidth;
            })
        });
        window.dispatchEvent(new Event('resize'));
    }
    if (isSet('.text-and-picture_slider')){
        initSlider('.text-and-picture_slider .text-and-picture__slider', 1)
    }
})


window.addEventListener('scroll', function () {
    changeHeaderStyle();
})

