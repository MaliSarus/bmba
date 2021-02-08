import {xxlWidth} from "./window-width-values";

export function videoContainerChangeWidth() {
    const videoContainer = document.querySelector('.video-section__video');
    if (window.innerWidth >= xxlWidth) {
        const videoInfoBlock = document.querySelector('.video-section__block');
        const videoInfoBlockX = videoInfoBlock.getBoundingClientRect().left + videoInfoBlock.offsetWidth;
        videoContainer.style.width = videoInfoBlockX + 'px';
    } else {
        videoContainer.removeAttribute('style')
    }
}

export function videoPlayButtonHandle() {
    const videoContainer = document.querySelector('.video-section__video');
    const videoPopup = document.querySelector('.video-popup');
    const videoBlock = document.querySelector('.video-popup__block');
    const videoPlayButton = document.querySelector('.video-section__play');
    const videoId = videoContainer.dataset.id;
    videoPlayButton.addEventListener('click', function () {
        videoPopup.classList.add('open');
        document.body.classList.add('hidden')
        const videoFrame = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        videoBlock.insertAdjacentHTML('beforeend', videoFrame);
    })
}