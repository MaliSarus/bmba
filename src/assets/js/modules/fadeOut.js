export default function fadeOutEffect(target, callback) {
    const fadeTarget = target
    const fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
            setTimeout(callback,200)
        }
    }, 50);
}