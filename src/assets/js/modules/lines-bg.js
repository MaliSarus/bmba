const linesBgTemplate = `
    <div class="lines-background">
        <div class="container h-100">
            <div class="row h-100">
                <div class="col-12 col-xl-3 h-100">
                    <div class="bg-line-left h-100"></div>
                </div>
                <div class="col-12 col-xl-4 h-100 d-none d-xl-block">
                    <div class="bg-line-left h-100"></div>
                </div>
                <div class="col-12 col-xl-5 h-100 d-none d-xl-block">
                    <div class="bg-line-left h-100"></div>
                </div>
            </div>
        </div>
    </div>
`

const linesTwoBgTemplate = `
    <div class="lines-background">
        <div class="container h-100">
            <div class="row h-100">
                <div class="col-12 col-xl-2 offset-xl-10 h-100 d-none d-xl-block">
                    <div class="bg-line-left h-100"></div>
                </div>
            </div>
        </div>
    </div>
`

export function addLinesBg (element){
    element.insertAdjacentHTML('afterbegin', linesBgTemplate);
}
export function addTwoLinesBg (element){
    element.insertAdjacentHTML('afterbegin', linesTwoBgTemplate);
}
