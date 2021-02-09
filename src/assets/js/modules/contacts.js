// метка[59.90,30.29]
const placemarkTemplate = `
    <div class="metro__map-placemark"></div>
`
export default function contactsInit() {
    let myMap;

    function init() {
        // Создание карты.
        myMap = new ymaps.Map("contacts-section__map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [59.90188410070986,30.288946567459124],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 15
        });
        var polygonLayout = ymaps.templateLayoutFactory.createClass(placemarkTemplate);
        var polygonPlacemark = new ymaps.Placemark(
            myMap.getCenter(), {}, {
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
        myMap.geoObjects.add(polygonPlacemark);
    }

    ymaps.ready(init)
}