import Swiper from "swiper/bundle";
import {lgWidth, xlWidth} from "./window-width-values";
import getParents from "./getParents";
import customPaginationInit from "./customPagination";

export default function fleetPrimarySliderInit() {
    const realSlides = document.querySelectorAll('.fleet-primary-section__slider .swiper-slide').length;
    const mySwiper = new Swiper('.fleet-primary-section__slider .swiper-container', {
        pagination: {
            el: '.fleet-primary-section__slider .swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                const formIndex = index < 10 ? '0' + (index + 1) : index + 1
                return `<span class="${className}" data-index="${formIndex}"></span>`;
            },
        },
        navigation: {
            nextEl: '.fleet-primary-section__slider-arrows .slider-arrows__next',
            prevEl: '.fleet-primary-section__slider-arrows .slider-arrows__prev',
        }
    })

    if (getParents(document.querySelector('.fleet-primary-section__slider'), document.querySelector('.service-fleet-section'))) {
        const paginationContainer = document.querySelectorAll('.service-fleet-section .fleet-primary-section__pagination');
        paginationContainer.forEach(container => {
            customPaginationInit(container, mySwiper, realSlides, 5)
        })
        const tabsWrapper = document.querySelector('.fleet-primary-section__tabs');
        const tabs = document.querySelectorAll('.fleet-primary-section__tabs .fleet-primary-section__info');

        let maxTabHeight = 0;
        tabs.forEach(tab => {
            if (tab.offsetHeight > maxTabHeight) {
                maxTabHeight = tab.offsetHeight;
            }
        })
        tabsWrapper.style.height = `calc(${maxTabHeight}px + 35px)`

    } else {
        mySwiper.on('slideChangeTransitionStart', function () {
            const swiperPagination = document.querySelector('.fleet-primary-section__slider .swiper-pagination')
            if (window.innerWidth > xlWidth) {
                const fleetBackgroundTitle = document.querySelector('.fleet-primary-section__background-word');
                const maxBackgroundTitleOffset = 100;
                const currentBackgroundTitleOffset = mySwiper.realIndex * maxBackgroundTitleOffset / realSlides
                fleetBackgroundTitle.style.top = `calc(50% - ${currentBackgroundTitleOffset}px)`
            }
            swiperPagination.style.left = (mySwiper.width - swiperPagination.offsetWidth) / (realSlides - 1) * mySwiper.realIndex + 'px'
        })
    }
    const tabs = document.querySelectorAll('.fleet-primary-section__tabs .fleet-primary-section__info');
    mySwiper.on('slideChangeTransitionStart', function () {
        tabs.forEach(tab => {
            tab.classList.remove('active')
        });
    })
    mySwiper.on('slideChangeTransitionEnd', function () {
        const dataFloat = mySwiper.slides[mySwiper.realIndex].dataset.float;
        document.querySelector(`.fleet-primary-section__tabs .fleet-primary-section__info[data-float="${dataFloat}"]`).classList.add('active')
    })
    window.addEventListener('resize', function () {
        const tabsWrapper = document.querySelector('.fleet-primary-section__tabs');
        const tabs = document.querySelectorAll('.fleet-primary-section__tabs .fleet-primary-section__info');
        if (window.innerWidth < lgWidth) {
            let maxTabHeight = 0;
            tabs.forEach(tab => {
                if (tab.offsetHeight > maxTabHeight) {
                    maxTabHeight = tab.offsetHeight;
                }
            })
            tabsWrapper.style.height = `calc(${maxTabHeight}px + 35px)`
        } else {
            if (!document.querySelector('.fleet-primary-section').classList.contains('service-fleet-section')) tabsWrapper.removeAttribute('style');
        }

    })
}