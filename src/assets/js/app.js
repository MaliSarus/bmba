import changeHeaderStyle from "./modules/header";
import addLinesBg from './modules/lines-bg';
import Swiper from 'swiper/bundle';
import initAccordion from "./modules/accordion";
// import homePageTopInit from "./modules/home-page-top";


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
            el: '.fleet-primary-section__slider .swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                const formIndex = index < 10 ? '0' + (index + 1) : index + 1
                return `<span class="${className}" data-index="${formIndex}"></span>`;
            },
        },
        navigation: {
            nextEl: `.fleet-primary-section__slider-arrows .slider-arrows__next`,
            prevEl: `.fleet-primary-section__slider-arrows .slider-arrows__prev`,
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
        },
        navigation: {
            nextEl: `.partners-section__slider-arrows .slider-arrows__next`,
            prevEl: `.partners-section__slider-arrows .slider-arrows__prev`,
        }
    })
}

function textAndSliderInit() {
    const sliderContainers = document.querySelectorAll('.text-and-slider-section')
    sliderContainers.forEach((slider, index) => {
        slider.classList.add('s' + index);
        const realSlides = slider.querySelectorAll('.text-and-slider-section__slider .swiper-slide').length;

        const mySwiper = new Swiper(`.s${index} .text-and-slider-section__slider .swiper-container`, {
            slidesPerView: 1,
            scrollbar: {
                el: `.s${index} .text-and-slider-section__slider-scrollbar .scrollbar`,
            },
            pagination: {
                el: `.s${index} .text-and-slider-section__fraction`,
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    const formCurrent = current < 10 ? '0' + current : current;
                    return `<span class="swiper-pagination-current">${formCurrent}</span>
                       / 
                    <span class="swiper-pagination-total">${total}</span>`
                }
            },
            navigation: {
                nextEl: `.s${index} .slider-arrows__next`,
                prevEl: `.s${index} .slider-arrows__prev`,
            },
        })
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

function videoContainerChangeWidth() {
    const videoContainer = document.querySelector('.video-section__video');
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

    if (isSet('.slider-arrows')) {
        const sliderArrows = document.querySelectorAll('.slider-arrows');
        sliderArrows.forEach(arrows => {
            arrows.addEventListener('mouseenter', function (event) {
                const nextArrow = this.querySelector('.slider-arrows__next');
                const prevArrow = this.querySelector('.slider-arrows__prev');
                nextArrow.addEventListener('mouseenter', function () {
                    this.classList.add('hover');
                    prevArrow.classList.add('unhover');
                })
                nextArrow.addEventListener('mouseleave', function () {
                    this.classList.remove('hover');
                    prevArrow.classList.remove('unhover');
                })
                prevArrow.addEventListener('mouseenter', function () {
                    this.classList.add('hover');
                    nextArrow.classList.add('unhover');
                })
                prevArrow.addEventListener('mouseleave', function () {
                    this.classList.remove('hover')
                    nextArrow.classList.remove('unhover');
                })
            })
        })
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
        const acc = document.querySelectorAll('.accordion .accordion__title');
        initAccordion(acc)
    }
})

window.addEventListener('scroll', function () {
    changeHeaderStyle();
})

