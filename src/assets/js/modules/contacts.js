// метка[59.90,30.29]

export default function contactsInit() {
    let myMap;
    function init() {
        // Создание карты.
        myMap = new ymaps.Map("contacts-section__map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [59.90,30.29],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 15
        });

    }
    ymaps.ready(init)
}