import Swiper from "swiper/bundle";
import {xlWidth} from "./window-width-values";

export default function fleetPimarySliderInit() {
    const realSlides = document.querySelectorAll('.fleet-primary-section__slider .swiper-slide').length;
    const mySwiper = new Swiper('.fleet-primary-section__slider .swiper-container', {
        loop: true,
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