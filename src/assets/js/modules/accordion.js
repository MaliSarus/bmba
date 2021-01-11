const initAccordion = function (acc) {
    acc.forEach((el, index) => {
        if (index === 0) {
            const accContent = el.nextElementSibling;
            el.classList.add("active");
            accContent.style.maxHeight = accContent.scrollHeight + "px";
        }

        el.addEventListener("click", function () {
            const filter = acc.forEach(el => {
                if (el !== this){
                    const accContent = el.nextElementSibling;
                    el.classList.remove("active");
                    accContent.removeAttribute('style');
                }
            })
            this.classList.toggle("active");
            const accContent = this.nextElementSibling;
            accContent.style.maxHeight ?
                accContent.removeAttribute('style')
                : accContent.style.maxHeight = accContent.scrollHeight + "px";
        });
    })
}
export default initAccordion;