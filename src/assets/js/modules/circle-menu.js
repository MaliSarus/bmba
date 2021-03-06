import {gsap} from "gsap";
import {nodeListToArray, offsetLeft, offsetTop, scrollTo} from "./helpers";

let oldActiveSectionIndex = 0;
function changeCircleMenuStyle() {
    const windowTop = window.scrollY
    const circleMenu = document.querySelector('.circle');
    const mainTop = document.querySelector('.header-to-transparent');
    const footer = document.querySelector('footer');
    const footerOffset = offsetTop(footer)
    const circleOffset = circleMenu.offsetHeight / 2 + offsetTop(circleMenu);

    if (mainTop) {
        const mainTopHeight = mainTop.offsetHeight;
        circleOffset < mainTopHeight ?
            circleMenu.classList.add('circle_white')
            : circleMenu.classList.remove('circle_white');
    } else {
        circleMenu.classList.remove('header_white');
    }
    circleOffset > footerOffset ?
        circleMenu.classList.add('circle_footer')
        : circleMenu.classList.remove('circle_footer');

}

function changeActiveMenuItem() {
    const windowTop = window.scrollY + window.innerHeight / 2;
    const circleWrapper = document.querySelector('.circle__wrapper')
    const circleElements = nodeListToArray(circleWrapper.querySelectorAll('.circle__element'))
    const sections = [];
    circleElements.forEach(el => {
        sections.push(document.querySelector(el.getAttribute('href')))
    })

    sections.forEach((section, index) => {
        const sectionOffset = offsetTop(section);
        const sectionBottomOffset = sectionOffset + section.offsetHeight;
        const rotateType = {
            isSame: false,
            isPrev: false,
            isNext: false,
        };
        if (windowTop >= sectionOffset && windowTop <= sectionBottomOffset) {
            if (oldActiveSectionIndex > index) {
                rotateType.isPrev = true
            }
            if (oldActiveSectionIndex < index) {
                rotateType.isNext = true
            }
            if (oldActiveSectionIndex === index) {
                rotateType.isSame = true
            }
            if (!rotateType.isSame) {
                const element = circleElements.filter(element => element.getAttribute('href') === '#' + section.getAttribute('id'))
                setClassesToElements(element[0])
                rotateCircle(element[0], rotateType)
                oldActiveSectionIndex = index
            }
        }
    })

}

function placeCircleElement() {
    const deg = Math.PI;
    const
        fields = document.querySelectorAll('.circle__element'),
        container = document.querySelector('.circle__wrapper'),
        radius = container.offsetWidth / 2,
        width = container.offsetWidth,
        height = container.offsetHeight,
        step = (-Math.PI) / fields.length,
        circle = document.querySelector('.circle'),
        circleOffsetLeft = offsetLeft(circle),
        circleOffsetTop = offsetTop(circle),
        center_x = circleOffsetLeft + circle.offsetWidth / 2,
        center_y = circleOffsetTop + circle.offsetHeight / 2;
    let angle = deg || Math.PI * 3.5;

    fields[0].classList.add('active')
    fields.forEach((field, index) => {
        const x = Math.round(width / 2 + radius * Math.cos(angle) - field.offsetWidth / 2);
        const y = Math.round(height / 2 + radius * Math.sin(angle) - field.offsetHeight / 2);
        field.style.left = x + 'px';
        field.style.top = y + 'px';
        angle += step;
        if (index !== 0) {
            const initFz = 12;
            const initOpacity = 1;
            field.classList.add('next')
            field.style.fontSize = (initFz - 2 * (index - 1)) + 'px';
            field.style.opacity = (initOpacity - 0.2 * (index - 1));
        }

    });
}


let oldDegree = 0;
let rotateToClick = false;


function setClassesToElements(element) {
    const that = element;
    const circleElements = document.querySelectorAll('.circle__element');
    const circleElementsArray = nodeListToArray(circleElements);
    const clickedElementIndex = circleElementsArray.indexOf(that)
    circleElements.forEach(element => {
        element.classList.remove('active')
        element.classList.remove('next')
        element.classList.remove('prev')
    })
    that.classList.add('active');
    const prevElements = circleElementsArray.filter((el, index) => index < clickedElementIndex).reverse()
    const nextElements = circleElementsArray.filter((el, index) => index > clickedElementIndex)
    prevElements.forEach((el, index) => {
        const initFz = 12;
        const initOpacity = 1;
        el.classList.add('prev')
        el.style.fontSize = (initFz - 2 * index) + 'px';
        el.style.opacity = (initOpacity - 0.2 * index);
    })
    nextElements.forEach((el, index) => {
        const initFz = 12;
        const initOpacity = 1;
        el.classList.add('next')
        el.style.fontSize = (initFz - 2 * index) + 'px';
        el.style.opacity = (initOpacity - 0.2 * index);
    })
}

function rotateCircle(element, {isSame, isPrev, isNext}) {
    const that = element;
    const fieldIcon = that.querySelector('.circle__element-icon')
    const circle = document.querySelector('.circle'),
        circleOffsetLeft = offsetLeft(circle),
        circleOffsetTop = offsetTop(circle),
        center_x = circleOffsetLeft + (circle.offsetWidth / 2),
        center_y = circleOffsetTop + (circle.offsetHeight / 2),
        finish_x = circleOffsetLeft,
        finish_y = circleOffsetTop + (circle.offsetHeight / 2),
        fieldOffsetLeft = offsetLeft(fieldIcon),
        fieldOffsetTop = offsetTop(fieldIcon),
        field_x = fieldOffsetLeft + fieldIcon.offsetWidth / 2,
        field_y = fieldOffsetTop + fieldIcon.offsetHeight / 2;
    let degreeToField = Math.abs(Math.atan2(field_y - center_y, field_x - center_x) * (180 / Math.PI)),
        degreeToFinish = Math.abs(Math.atan2(finish_y - center_y, finish_x - center_x) * (180 / Math.PI));
    if (field_y > center_y) {
        degreeToField *= -1;
    }
    if (!isSame) {
        if (isNext) {
            let degree = degreeToFinish + degreeToField;
            gsap.to(".circle__wrapper", {duration: .5, rotation: (oldDegree + degree)});
            gsap.to('.circle__element', {duration: .5, rotation: -1 * (oldDegree + degree)});
            oldDegree += degree;
        } else if (isPrev) {
            let degree = degreeToFinish - degreeToField;
            gsap.to(".circle__wrapper", {duration: .5, rotation: (oldDegree - degree)});
            gsap.to('.circle__element', {duration: .5, rotation: -1 * (oldDegree - degree)});
            oldDegree -= degree;
        }
    }
}

function fieldClickHandle(event) {
    rotateToClick = true;
    // Листаем до элемента
    scrollTo(event, function () {
        rotateToClick = false;
    });
    // Листаем до элемента!

    // Узнаем, какого рода переход
    const rotateType = {
        isSame: this.classList.contains('active'),
        isPrev: this.classList.contains('prev'),
        isNext: this.classList.contains('next')
    }
    // Узнаем, какого рода переход!

    //Назначаем классы
    setClassesToElements(event.currentTarget)
    //Назначаем классы!

    // Прокручиваем круг
    rotateCircle(event.currentTarget, rotateType)
    // Прокручиваем круг!
}


export default function initCircleMenu() {
    const sections = document.querySelectorAll('section');
    const circleWrapper = document.querySelector('.circle__wrapper')
    sections.forEach((section, index) => {
        const sectionId = section.getAttribute('id');
        const sectionShortName = section.getAttribute('data-short');

        const circleElementTemplate = `
            <a href="#${sectionId}" class="circle__element">
                <div class="circle__element-icon">
                </div>               
                <div class="circle__element-content">${sectionShortName}</div>
            </a>
        `
        circleWrapper.insertAdjacentHTML('beforeend', circleElementTemplate);
    })
    placeCircleElement();
    const fieldsElement = document.querySelectorAll('.circle__element');
    fieldsElement.forEach(field => {
        field.addEventListener('click', fieldClickHandle)
    })
    changeCircleMenuStyle()

    window.addEventListener('scroll', function () {
        changeCircleMenuStyle();
        if (!rotateToClick) {
            changeActiveMenuItem();
        }
    })
}
