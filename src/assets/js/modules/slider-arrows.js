export default function sliderArrowsHandle() {
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