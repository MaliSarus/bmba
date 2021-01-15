import Swiper from "swiper/bundle";
import {mdWidth, smWidth, xlWidth, lgWidth} from "./window-width-values";
import customPaginationInit from "./customPagination";

export default function documentsSliderInit() {
    const realSlides = document.querySelectorAll('.documents-section__slider .swiper-slide').length
    const paginationContainer = document.querySelector('.documents-section__pagination');
    let mySwiper = new Swiper('.documents-section__slider .swiper-container', {
        slidesPerView: 2,
        slidesPerGroup: 2,
        breakpoints: {
            [mdWidth]:{
                slidesPerView: 3,
                slidesPerGroup: 3
            },
            [lgWidth]:{
                slidesPerView: 4,
                slidesPerGroup: 4
            },
            [xlWidth]:{
                slidesPerView: 3,
                slidesPerGroup: 3
            },
        },
    })
    function updatePagination() {
        console.log('breakpoint')
        mySwiper.destroy(false, true);
        mySwiper = new Swiper('.documents-section__slider .swiper-container', {
            slidesPerView: 2,
            slidesPerGroup: 2,
            breakpoints: {
                [mdWidth]:{
                    slidesPerView: 3,
                    slidesPerGroup: 3
                },
                [lgWidth]:{
                    slidesPerView: 4,
                    slidesPerGroup: 4
                },
                [xlWidth]:{
                    slidesPerView: 3,
                    slidesPerGroup: 3
                },
            },
        })
        paginationContainer.innerHTML = ''
        customPaginationInit(paginationContainer,mySwiper,realSlides,2)
        mySwiper.slideTo(0)
        mySwiper.update()
        mySwiper.on('breakpoint',updatePagination)
    }
    mySwiper.on('breakpoint',updatePagination)
    customPaginationInit(paginationContainer,mySwiper,realSlides,2)
}