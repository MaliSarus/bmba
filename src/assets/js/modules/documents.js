import Swiper from "swiper/bundle";
import {xlWidth} from "./window-width-values";
export default function documentsSliderInit(){
    const mySwiper = new Swiper('.documents-section__slider .swiper-container', {
        slidesPerView: 1,

        breakpoints:{
            [xlWidth]:{
                slidesPerView: 3,
                slidesPerGroup: 3
            }
        },
    })
}