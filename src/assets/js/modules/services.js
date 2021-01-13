export function servicesCardInit() {
    const servicesTitles = document.querySelectorAll('.services-section__title')
    const servicesHiddenText = document.querySelectorAll('.services-section__service-hidden')
    const servicesContent = document.querySelectorAll('.services-section__service-content');
    const servicesLink = document.querySelectorAll('.services-section__service a')
    const servicesSection = document.querySelector('.services-section')
    let minTitleHeight = servicesTitles[1].offsetHeight;
    for (let i = 0; i < servicesTitles.length; i++) {
        minTitleHeight = servicesTitles[i].offsetHeight < minTitleHeight ?
            servicesTitles[i].offsetHeight
            : minTitleHeight
    }
    servicesTitles.forEach(title => {
        title.style.maxHeight = minTitleHeight+'px';
    })

    let maxTextHeight = 0;
    for (let i = 0; i < servicesHiddenText.length; i++) {
        maxTextHeight = servicesHiddenText[i].offsetHeight > maxTextHeight ?
            servicesHiddenText[i].offsetHeight
            : maxTextHeight
    }
    servicesHiddenText.forEach(text => {
        text.style.height = maxTextHeight+'px';
    })


    servicesContent.forEach(elem=>{
        const offset = elem.querySelector('.services-section__title').offsetHeight
        elem.style.transform = `translateY(calc(100% - ${offset}px))`;
    })

    servicesLink.forEach(link=>{
        link.addEventListener('mouseover',function () {
            const backgroundImage = this.dataset.bg;
            console.log(backgroundImage);
            servicesSection.style.backgroundImage = `url("${backgroundImage}")`;
        })
    })
}