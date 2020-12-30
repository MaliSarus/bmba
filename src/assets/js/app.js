import changeHeaderStyle from "./modules/header";
import addLinesBg from './modules/lines-bg';
import Swiper from 'swiper/bundle';
import Accordion from 'accordion-js'


const xsWidth = 0;
const smWidth = 576;
const mdWidth = 768;
const lgWidth = 992;
const xlWidth = 1200;
const xxlWidth = 1600;

function isSet(element) {
    return document.querySelectorAll(element).length !== 0;
}

function hamburgerHandle() {
    const hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', function () {
        const header = document.querySelector('.header');
        const mobileNav = document.querySelector('.header__nav.mobile-nav');
        const body = document.querySelector('body');
        this.classList.toggle('is-active');
        if (!header.classList.contains('open')) {
            header.classList.add('open');
        } else {
            header.classList.remove('open');
            mobileNav.scrollTop = 0;
        }

        body.classList.toggle('hidden');
    })
}

function fleetPimarySliderInit() {
    const realSlides = document.querySelectorAll('.fleet-primary-section__slider .swiper-slide').length;
    const mySwiper = new Swiper('.fleet-primary-section__slider .swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return `<span class="${className}" data-index="${index}"></span>`;
            },
        },
    })

    mySwiper.on('slideChangeTransitionStart', function () {
        const swiperPagination = document.querySelector('.fleet-primary-section__slider .swiper-pagination')
        swiperPagination.style.left = mySwiper.width / realSlides * mySwiper.realIndex + 'px'
    })
}

function partnersSliderInit() {
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
        }
    })
}

function textAndSliderInit() {
    const realSlides = document.querySelectorAll('.text-and-slider-section__slider .swiper-slide').length;

    const mySwiper = new Swiper('.text-and-slider-section__slider .swiper-container', {
        slidesPerView: 1,
        scrollbar: {
            el: '.text-and-slider-section__slider-scrollbar .scrollbar',
        },
    })

    // const swiperScrollBar= document.querySelector('.text-and-slider-section__slider-scrollbar');
    // const swiperScrollBarDrag = document.querySelector('.text-and-slider-section__slider-scrollbar .scrollbar__drag');
    // swiperScrollBarDrag.style.width = swiperScrollBar.clientWidth / realSlides + 'px';
    //
    // mySwiper.on('slideChangeTransitionStart', function () {
    //     swiperScrollBarDrag.style.left = swiperScrollBar.clientWidth / realSlides * mySwiper.realIndex + 'px'
    // })
}

function historySliderInit() {
    const myThumbSwiper = new Swiper('.history-section__slider-thumb .swiper-container', {
        slidesPerView: 9,
        centeredSlides: true,
        loop: true,
        freeMode: true,
        loopedSlides: 10, //looped slides should be the same
        watchSlidesVisibility: true,
        slideToClickedSlide: true,
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

function videoContainerChangeWidth() {
    const videoContainer = document.querySelector('.video-section__video');
    console.log(window.innerWidth)
    if (window.innerWidth >= xxlWidth) {
        const videoInfoBlock = document.querySelector('.video-section__block');
        const videoInfoBlockX = videoInfoBlock.getBoundingClientRect().left + videoInfoBlock.offsetWidth;
        videoContainer.style.width = videoInfoBlockX + 'px';
    } else {
        videoContainer.removeAttribute('style')
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    changeHeaderStyle();
    hamburgerHandle();


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
        const videoContainer = document.querySelector('.video-section__video');
        const videoPlayButton = document.querySelector('.video-section__play');
        const videoId = videoContainer.dataset.id;
        videoPlayButton.addEventListener('click', function () {
            document.querySelector('.video-section').classList.add('active')
            setTimeout(function () {
                const videoFrame = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                videoContainer.insertAdjacentHTML('beforeend', videoFrame);
            }, 1000)
        })
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
        // const acrd = document.querySelector('.faq-section .accordion')
        new Accordion('.faq-section .accordion-container')
    }
})

window.addEventListener('scroll', function () {
    changeHeaderStyle();
})

