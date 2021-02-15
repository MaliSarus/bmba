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
    if (videoContainer && !videoContainer.classList.contains('wrong-page')) {
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
}
export function videoSnippetPlayButtonHandle() {
    const videoSnippetContainer = document.querySelectorAll('.video')
    videoSnippetContainer.forEach(videoContainer => {
        const videoSnippetId = videoContainer.dataset.id;
        const videoSnippetPlayButton = videoContainer.querySelector('.video__play');
        const videoPoster = `<img src="http://i.ytimg.com/vi/${videoSnippetId}/sddefault.jpg">`
        // videoSnippetPlayButton.style.backgroundImage = `url("http://i.ytimg.com/vi/${videoSnippetId}/sddefault.jpg")`
        videoSnippetPlayButton.insertAdjacentHTML('beforeend', videoPoster);

        videoSnippetPlayButton.addEventListener('click', function () {
            const videoFrame = `<iframe src="https://www.youtube.com/embed/${videoSnippetId}?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            videoContainer.insertAdjacentHTML('beforeend', videoFrame);
        })
    })

}