import Swiper from "swiper/bundle";
import {mdWidth, xlWidth} from "./window-width-values";
import SimpleScrollbar from "simple-scrollbar";

export default function historySliderInit() {
    const myThumbSwiper = new Swiper('.history-section__slider-thumb .swiper-container', {
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        freeMode: true,
        loopedSlides: 3, //looped slides should be the same
        watchSlidesVisibility: true,
        slideToClickedSlide: true,
        breakpoints: {
            1200: {
                slidesPerView: 6,
                loopedSlides: 7
            },
            1600: {
                slidesPerView: 9,
                loopedSlides: 10
            }

        },
        navigation: {
            nextEl: `.history-section__slider-arrows .slider-arrows__next`,
            prevEl: `.history-section__slider-arrows  .slider-arrows__prev`,
        },
    })
    const mySwiper = new Swiper('.history-section__slider .swiper-container', {
        loop: true,
        loopedSlides: 10, //looped slides should be the same
        speed: 800,
        spaceBetween: 0,
    });

    mySwiper.on('slideChangeTransitionEnd', function () {
        const rI = mySwiper.realIndex;
        myThumbSwiper.slideToLoop(rI);
    });
    myThumbSwiper.on('slideChangeTransitionEnd', function () {
        const rI = myThumbSwiper.realIndex;
        mySwiper.slideToLoop(rI);
    })

    const slideText = document.querySelectorAll('.history-section__slider .slide__text')
    if (window.innerWidth >= xlWidth) {
        slideText.forEach(el => {
            SimpleScrollbar.initEl(el);
        })
    }
    window.addEventListener('resize', function () {
        if (window.innerWidth >= xlWidth) {
            slideText.forEach(el => {
                SimpleScrollbar.initEl(el);
            })
        }
    })



}