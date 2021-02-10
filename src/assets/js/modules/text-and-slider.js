import Swiper from "swiper/bundle";

export default function textAndSliderInit() {
    const sliderContainers = document.querySelectorAll('.text-and-slider-section')
    sliderContainers.forEach((slider, index) => {
        slider.classList.add('s' + index);
        const realSlides = slider.querySelectorAll('.text-and-slider-section__slider .swiper-slide').length;

        const mySwiper = new Swiper(`.s${index} .text-and-slider-section__slider .swiper-container`, {
            slidesPerView: 1,
            loop: true,
            pagination: {
                el: `.s${index} .text-and-slider-section__fraction`,
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    const formCurrent = current < 10 ? '0' + current : current;
                    const formTotal= realSlides < 10 ? '0' + realSlides : realSlides;
                    return `<span class="swiper-pagination-current">${formCurrent}</span>
                       / 
                    <span class="swiper-pagination-total">${formTotal}</span>`
                }
            },
            navigation: {
                nextEl: `.s${index} .slider-arrows__next`,
                prevEl: `.s${index} .slider-arrows__prev`,
            },
        })
        const scrollbarWrapper = slider.querySelector('.text-and-slider-section__slider-scrollbar .scrollbar');
        scrollbarWrapper.insertAdjacentHTML('beforeend',`<div class="scrollbar-drag"></div>`)
        const scrollbarDrag = scrollbarWrapper.querySelector('.scrollbar-drag');
        const scrollbarOffset = scrollbarWrapper.offsetWidth / realSlides;

        scrollbarDrag.style.width = scrollbarOffset + 'px';
        mySwiper.on('slideChangeTransitionEnd', function () {
            const index = mySwiper.realIndex;
            scrollbarDrag.style.left = index * scrollbarOffset + 'px'
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