function changeHeaderStyle(){
    const windowTop = window.scrollY
    const header = document.querySelector('header');
    const mainTop = document.querySelector('.main-top');
    const headerOffset = windowTop + header.offsetHeight;
    const mainTopHeight = mainTop.offsetHeight;
    headerOffset < mainTopHeight ?
        header.classList.add('header_transparent')
        : header.classList.remove('header_transparent');

}

export default changeHeaderStyle;