export default function customPaginationInit(container, mySwiper, realSlides, maxBullets) {
    const paginationContainer = container
    const slidesPerGroup = Math.ceil(realSlides / mySwiper.params.slidesPerGroup);

    for (let i = 0; i < slidesPerGroup; i++) {
        const formIndex = i < 10 ? '0' + (i + 1) : i + 1;
        let paginationBullet = `<span class="swiper-pagination-bullet" data-index="${formIndex}" tabindex="0"></span>`
        if (i === 0) {
            paginationBullet = `<span class="swiper-pagination-bullet swiper-pagination-bullet-active prev" data-index="${formIndex}" tabindex="0"></span>`
        }
        if (i === slidesPerGroup - 1) {
            paginationBullet = `<span class="swiper-pagination-bullet next" data-index="${formIndex}" tabindex="0"></span>`
        }
        if (slidesPerGroup > maxBullets) {
            if (i >= maxBullets - 1 && i < slidesPerGroup - 1) {
                paginationBullet = `<span class="swiper-pagination-bullet hidden" data-index="${formIndex}" tabindex="0"></span>`
            }
        }
        paginationContainer.insertAdjacentHTML('beforeend', paginationBullet);
    }
    paginationContainer.addEventListener('click', function (event) {
        const paginationBullet = paginationContainer.querySelector('.swiper-pagination-bullet')
        const next = paginationContainer.querySelector('.swiper-pagination-bullet.next')
        const prev = paginationContainer.querySelector('.swiper-pagination-bullet.prev')
        if (next && event.target === next) {
            mySwiper.slideNext()
        }
        if (prev && event.target === prev) {
            mySwiper.slidePrev()
        }
        const eventClassList = event.target.classList;
        if (eventClassList.contains('swiper-pagination-bullet') && !eventClassList.contains('next') && !eventClassList.contains('prev')) {
            const index = (+event.target.dataset.index - 1) * mySwiper.params.slidesPerGroup
            console.log(index)
            mySwiper.slideTo(index)
        }
    })

    const paginationBullets = container.querySelectorAll('.swiper-pagination-bullet')
    mySwiper.on('slideChange', function () {
        const sliderSlidesPerGroup = mySwiper.params.slidesPerGroup;
        const slidesInGroup = mySwiper.realIndex;

        const currentGroupIndex = Math.floor(slidesInGroup / sliderSlidesPerGroup);
        const offset = Math.floor((maxBullets - 2) / 2)
        paginationBullets.forEach((bullet, index) => {
            bullet.classList.remove('swiper-pagination-bullet-active');
            bullet.classList.add('hidden')
            if (index === 0 || index === paginationBullets.length - 1) {
                bullet.classList.remove('hidden')
            }
        })
        if (realSlides > 2) {
            for (let i = 0; i <= offset; i++) {

                if (currentGroupIndex >= offset && currentGroupIndex < paginationBullets.length - 1) {
                    paginationBullets[currentGroupIndex + offset].classList.remove('hidden');
                    paginationBullets[currentGroupIndex - offset].classList.remove('hidden');
                }
                if (offset > 0) {
                    if (currentGroupIndex === 0) {
                        paginationBullets[currentGroupIndex + i + 1].classList.remove('hidden');
                        paginationBullets[currentGroupIndex + offset * 2 + 1].classList.remove('hidden');
                    }
                    if (currentGroupIndex === paginationBullets.length - 1) {
                        paginationBullets[currentGroupIndex - i - 1].classList.remove('hidden');
                        paginationBullets[currentGroupIndex - offset * 2 - 1].classList.remove('hidden');
                    }
                    if (currentGroupIndex === offset) {
                        paginationBullets[currentGroupIndex + i + 1].classList.remove('hidden');
                        paginationBullets[currentGroupIndex + offset + 1].classList.remove('hidden');
                    }
                    if (currentGroupIndex === paginationBullets.length - 1 - offset) {
                        paginationBullets[currentGroupIndex - i - 1].classList.remove('hidden');
                        paginationBullets[currentGroupIndex - offset - 1].classList.remove('hidden');
                    }
                }
            }
        }
        paginationBullets[currentGroupIndex].classList.remove('hidden');
        paginationBullets[currentGroupIndex].classList.add('swiper-pagination-bullet-active')
    })
}