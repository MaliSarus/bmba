import axios from "axios";
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

export function offsetLeft(element) {
    return element.getBoundingClientRect().left + window.scrollX
}

export function offsetTop(element) {
    return element.getBoundingClientRect().top + window.scrollY
}

export function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
}

export function scrollTo(event, callback = function () {}) {
    event.preventDefault();
    const linkHref = event.currentTarget.getAttribute('href');
    const elementTo = document.querySelector(linkHref)
    const elementPosition = elementTo.offsetTop;
    let headerOffset = document.querySelector('header').offsetHeight;
    let offsetPosition = elementPosition - headerOffset;
    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
    const callbackInterval = setInterval(function () {

        if (Math.trunc(window.scrollY) - 1 <= offsetPosition && Math.trunc(window.scrollY) + 1 >= offsetPosition){
            callback();
            clearInterval(callbackInterval)
        }
    },100)
}

export function getFullHeight(element) {
    const elmMargin = parseInt(document.defaultView.getComputedStyle(element, '').getPropertyValue('margin-top'))
        + parseInt(document.defaultView.getComputedStyle(element, '').getPropertyValue('margin-bottom'));
    const elementHeight = element.offsetHeight
    return elementHeight + elmMargin;
}

// export function getForecaToken() {
//     return axios
//         .get('http://bmba.sotbisite.beget.tech/ajax/get_token.php')
//         .then(res => {
//             localStorage.setItem('fwk', res.data)
//         })
// }

export function setFirstSectionOffset(element) {
    const headerHeight = document.querySelector('header').offsetHeight ;
    if (element.classList.contains('first-section_padding')) {
        element.style.paddingTop = headerHeight + 'px';
    }
    if (element.classList.contains('first-section_margin')){
        element.style.marginTop = headerHeight + 'px';
    }
}

export function setHeightToMobileVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}