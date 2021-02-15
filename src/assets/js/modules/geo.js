import {smWidth} from "./window-width-values";

export function initMap() {
    const ports = [
        {
            position: [59.94,30.32],
            layout: `
                <div class="geo-section__placemark placemark">
                    <div class="placemark__image"><img src="/local/templates/main/assets/img/dest/geo/spb.jpg" alt=""></div>
                    <div class="placemark__content">
                        <div class="placemark__subtitle">Морской торговый порт</div>
                        <div class="placemark__title">Санкт-Петербург</div>
                    </div>
                </div>
            `
        },
        {
            position: [59.66,28.26],
            layout: `
                <div class="geo-section__placemark placemark placemark_bottom">
                    <div class="placemark__image"><img src="/local/templates/main/assets/img/dest/geo/ust-luga.jpg" alt=""></div>
                    <div class="placemark__content">
                        <div class="placemark__subtitle">Морской торговый порт</div>
                        <div class="placemark__title">Усть-Луга</div>
                    </div>
                </div>
            `
        },
        {
            position: [60.62,28.57],
            layout: `
                <div class="geo-section__placemark placemark">
                    <div class="placemark__image"><img src="/local/templates/main/assets/img/dest/geo/visotsk.jpg" alt=""></div>
                    <div class="placemark__content">
                        <div class="placemark__subtitle">Морской торговый порт</div>
                        <div class="placemark__title">Высоцк</div>
                    </div>
                </div>
            `
        }
    ]
    let myMap;

    function init() {
        // Создание карты.
        myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [60.065, 29.300],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 7
        });

        ports.forEach(port => {
            var polygonLayout = ymaps.templateLayoutFactory.createClass(port.layout);
            var circleLayout = ymaps.templateLayoutFactory.createClass('<div class="geo-section__placemark-icon"></div>')

            var polygonPlacemark = new ymaps.Placemark(
                port.position, {}, {
                    iconLayout: polygonLayout,
                    iconShape: {
                        type: 'Rectangle',
                        // Прямоугольник описывается в виде двух
                        // точек - верхней левой и нижней правой.
                        coordinates: [
                            [-25, -25], [25, 25]
                        ]
                    }
                }
            );
            var circlePlacemark = new ymaps.Placemark(
                port.position, {}, {
                    iconLayout: circleLayout,
                    iconShape: {
                        type: 'Circle',
                        // Прямоугольник описывается в виде двух
                        // точек - верхней левой и нижней правой.
                        coordinates: [
                            [0, 0]
                        ]
                    }
                }
            );
            myMap.geoObjects.add(polygonPlacemark);
            myMap.geoObjects.add(circlePlacemark);
        })

    }

    if (window.innerWidth < smWidth) {
        ymaps.ready(init);
    }

    window.addEventListener('resize', function () {
        const sectionMapChildrenLength = document.querySelector('.geo-section__map').children.length
        if (window.innerWidth < smWidth && sectionMapChildrenLength === 0){
            ymaps.ready(init);
        }
        if (window.innerWidth >= smWidth && sectionMapChildrenLength !== 0){
            myMap.destroy()
        }
    })
}