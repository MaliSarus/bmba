import Swiper from "swiper/bundle";

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
        speed: 800
    });

    const swiperChange = function () {
        const rI = mySwiper.realIndex;
        myThumbSwiper.slideToLoop(rI)
        myThumbSwiper.on('slideChange', thumbChange)
    }

    const thumbChange = function () {
        mySwiper.off('slideChange', swiperChange);
        const rI = myThumbSwiper.realIndex;
        mySwiper.slideToLoop(rI);
        mySwiper.on('slideChange', swiperChange)
    }

    mySwiper.on('slideChange', swiperChange);
    mySwiper.on('slideChangeTransitionStart', function () {
        myThumbSwiper.off('slideChange', thumbChange);
    });
    mySwiper.on('slideChangeTransitionEnd', function () {
        myThumbSwiper.on('slideChange', thumbChange);
    });

    myThumbSwiper.on('slideChange', thumbChange)
    myThumbSwiper.on('slideChangeTransitionStart', function () {
        mySwiper.off('slideChange', swiperChange);
    })
    myThumbSwiper.on('slideChangeTransitionEnd', function () {
        mySwiper.on('slideChange', swiperChange);
    })

}