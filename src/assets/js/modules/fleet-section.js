import SimpleScrollbar from 'simple-scrollbar'
import Swiper from "swiper/bundle";
import {mdWidth} from "./window-width-values";
export function initScrollBar() {
    const el = document.querySelector('.fleet-section__right')
    if (window.innerWidth >= mdWidth) {
        SimpleScrollbar.initEl(el);
    }
    window.addEventListener('resize', function () {
        if (window.innerWidth >= mdWidth) {
            SimpleScrollbar.initEl(el);
        }
    })
}

export default function initFleetSection() {

    const mySwiper = new Swiper('.fleet-section__slider .swiper-container')

}