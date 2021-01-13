import Swiper from "swiper/bundle";

export default function partnersSliderInit() {
    const mySwiper = new Swiper('.partners-section__slider .swiper-container', {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 80,
        centeredSlides: true,
        breakpoints: {
            576: {
                slidesPerView: 3,
                centeredSlides: true,
                spaceBetween: 80,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 80,
                centeredSlides: false
            },
            1200: {
                slidesPerView: 5
            },
            1600: {
                slidesPerView: 5,
                spaceBetween: 180,
                centeredSlides: false
            },
        },
        navigation: {
            nextEl: `.partners-section__slider-arrows .slider-arrows__next`,
            prevEl: `.partners-section__slider-arrows .slider-arrows__prev`,
        }
    })
}