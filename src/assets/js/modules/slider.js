import {Swiper} from "swiper/bundle";

export default function initSlider(block,slidesPerView){
    const mySwiper = new Swiper(`${block} .swiper-container`,{
        slidesPerView,
        loop: true,
        navigation:{
            prevEl: `${block} .slider-arrows__prev`,
            nextEl: `${block} .slider-arrows__next`
        }
    })
}