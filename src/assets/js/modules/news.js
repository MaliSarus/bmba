import Swiper from "swiper/bundle";
import {xlWidth} from "./window-width-values";

export function newsYearsSliderInit() {
    const years = document.querySelectorAll('.news-section__years li');
    const round = document.querySelector('.news-section__years-wrapper .round')
    years.forEach(year => {
        year.addEventListener('click', function () {
            years.forEach(year => {
                year.removeAttribute('class')
            })
            const that = this
            const tabIndex = Array.prototype.slice.call(years).indexOf(this);
            const tabs = document.querySelectorAll('.news-section__center .tab');
            tabs.forEach((tab, index) => {
                tab.classList.remove('active');
                if (index === tabIndex) {
                    tab.classList.add('active');
                }
            })
            that.classList.add('active')
            setTimeout(function () {
                if (window.innerWidth >= xlWidth) {
                    const y = that.offsetTop
                    round.style.top = y + 'px'
                } else {
                    const x = that.offsetLeft
                    round.style.left = x + 'px'
                }
            }, 200)
        })
    })

    window.addEventListener('resize', function () {
        const round = document.querySelector('.news-section__years-wrapper .round')
        const activeYear = document.querySelector('.news-section__years li.active')
        round.removeAttribute('style')
        if (window.innerWidth >= xlWidth) {
            const y = activeYear.offsetTop
            round.style.top = y + 'px'
        } else {
            const x = activeYear.offsetLeft
            round.style.left = x + 'px'
        }
    })
}