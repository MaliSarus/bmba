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
    const sliderContainers = document.querySelectorAll('.fleet-section__slider');
    sliderContainers.forEach((slider, index) => {
        slider.classList.add('s' + index);
        const mySwiper = new Swiper(`.fleet-section__slider.s${index} .swiper-container`, {
            pagination: {
                el: `.fleet-section__slider.s${index} .fleet-primary-section__pagination`,
                clickable: true,
                renderBullet: function (index, className) {
                    const formIndex = index < 10 ? '0' + (index + 1) : index + 1
                    return `<span class="${className}" data-index="${formIndex}"></span>`;
                },
            }
        })
        console.log(mySwiper)
    })

}