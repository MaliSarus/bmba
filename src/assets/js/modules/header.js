export function changeHeaderStyle(){
    const windowTop = window.scrollY
    const header = document.querySelector('header');
    const mainTop = document.querySelector('.header-to-transparent');
    if (mainTop) {
        const headerOffset = windowTop + header.offsetHeight;
        const mainTopHeight = mainTop.offsetHeight;
        headerOffset < mainTopHeight ?
            header.classList.add('header_transparent')
            : header.classList.remove('header_transparent');
    }
    else{
        header.classList.remove('header_transparent');
    }

}

export function hamburgerHandle() {
    const hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', function () {
        const header = document.querySelector('.header');
        const mobileNav = document.querySelector('.header__nav.mobile-nav');
        const body = document.querySelector('body');
        this.classList.toggle('is-active');
        if (!header.classList.contains('open')) {
            header.classList.add('open');
        } else {
            header.classList.remove('open');
            mobileNav.scrollTop = 0;
        }

        body.classList.toggle('hidden');
    })
}
