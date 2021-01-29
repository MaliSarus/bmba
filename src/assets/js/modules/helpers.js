export function offsetLeft(element) {
    return element.getBoundingClientRect().left + window.scrollX
}

export function offsetTop(element) {
    return element.getBoundingClientRect().top + window.scrollY
}

export function nodeListToArray(nodeList){
    return Array.prototype.slice.call(nodeList);
}

export function scrollTo(event) {
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
}

export function getFullHeight(element) {
    const elmMargin = parseInt(document.defaultView.getComputedStyle(element, '').getPropertyValue('margin-top'))
        + parseInt(document.defaultView.getComputedStyle(element, '').getPropertyValue('margin-bottom'));
    const elementHeight = element.offsetHeight
    return elementHeight + elmMargin;

}