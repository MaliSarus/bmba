<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <title>БМБА</title>
    <link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png">
    <link rel="manifest" href="assets/favicon/site.webmanifest">
    <link rel="mask-icon" href="assets/favicon/safari-pinned-tab.svg" color="#216b70">
    <link rel="stylesheet" href="assets/css/normalize.css">
    <link rel="stylesheet" href="assets/css/bootstrap/bootstrap-grid.css">
    <link rel="stylesheet" href="assets/css/swiper-bundle.min.css">
    <link rel="stylesheet" href="assets/css/main.css">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">
    <meta name="viewport" content="width=device-width">

    <script defer src="assets/js/app.min.js"></script>
</head>
<body>

<!--Блок и скрипт для прелоадера-->
<style>
    .preloader {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
        background: white;
        transition: opacity 1s, visibility 1s;
    }

    .preloader-load {
        width: 254px;
        max-width: 100%;
        object-position: center;
    }

    .preloader-load svg{
        width: 100%;
    }



</style>
<div class="preloader">
    <div class="preloader-load" alt=""></div>
</div>
<script src="./assets/js/bodymovin.js"></script>
<script>
    document.body.classList.add('hidden')
    var preloaderLoad = document.querySelector('.preloader-load');
    var animItem = bodymovin.loadAnimation({
        wrapper: preloaderLoad,
        animType: 'svg',
        loop: false,
        autoplay: true,
        path: './assets/img/preloader.json'
    })
    var preloaderReady = document.querySelector('.preloader-ready');
    animItem.addEventListener('complete', function () {
        document.body.classList.add('ready');
        document.body.classList.remove('hidden')
    })
</script>
<!--Блок и скрипт для прелоадера-->
<script>
    if (document.querySelector('.preloader') === null) {
        var readyTimeout = setTimeout(function () {
            document.body.classList.add('ready')
            clearTimeout(readyTimeout)
        }, 1000)
    }
</script>
<div class="site-wrapper">
    <div class="request-popup">
        <div class="request-popup__block">
            <form action="#" class="form request-popup__form">
                <div class="request-popup__form-wrapper">
                    <div class="form__title">Оформление заявки</div>
                    <!--                <div class="form__subtitle">Укажите свои данные и мы свяжемся с Вами в течение дня</div>-->
                    <div class="form__group">
                        <div class="form__input name no-required"><input type="text" placeholder="Имя"></div>
                        <div class="form__input email required"><input type="email" placeholder="E-mail"></div>
                        <div class="form__input phone required"><input type="tel" placeholder="Телефон"></div>
                    </div>
                    <small>Нажимая на кнопку “Отправить” Вы соглашаетесь c политикой обработки персональных
                        данных</small>
                    <div class="form__submit">
                        <button class="link " type="submit">Отправить</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="success-popup">
        <div class="success-popup__block">
            <div class="success-popup__block-wrapper">
                <div class="success-popup__title">Спасибо</div>
                <div class="success-popup__subtitle">Заявка отправлена. Наш менеджер перезвонит Вам в ближайшее время
                    для
                    уточнения деталей.
                </div>
                <button class="link success-popup__close">Закрыть</button>
            </div>
        </div>
    </div>
    <div class="wrong-popup">
        <div class="wrong-popup__block">
            <div class="wrong-popup__block-wrapper">
                <div class="wrong-popup__title">Ошибка</div>
                <div class="wrong-popup__subtitle">
                    Произошла ошибка при отправке заявки. Попробуйте повторить попытку позднее.
                </div>
                <button class="link wrong-popup__close success-popup__close">Закрыть</button>
            </div>
        </div>
    </div>


    <div class="video-popup">
        <div class="video-popup__block">
            <div class="video-popup__ratio"></div>
        </div>
    </div>
    <header class="header header_transparent transparent-border_bottom">
        <div class="header__logo transparent-border_right">
            <a href="index.php" class="logo_white"><img src="../assets/img/dest/ui/logo-white.svg" alt=""></a>
            <a href="index.php" class="logo_green"><img src="../assets/img/dest/ui/logo-green.svg" alt=""></a>
        </div>
        <div class="header__nav desktop-nav">
            <div class="header__phone transparent-border_right">
                <a href="tel:+78124494712">+7 (812) 449 47 12</a>
            </div>
            <div class="header__menu">
                <nav>
                    <ul>
                        <li><a href="about-page.php" class="current">О компании</a></li>
                        <li><a href="services-page.php">Услуги</a></li>
                        <li><a href="calc-page.php">Расчет стоимости</a></li>
                        <li><a href="fleet-page.php">Флот</a></li>
                        <li><a href="geo-page.php">География</a></li>
                        <li><a href="contacts-page.php">Контакты</a></li>
                    </ul>
                </nav>
            </div>
            <div class="header__lang">
                <a href="#"><span class="header__lang-icon"></span>ENG</a>
            </div>
        </div>
        <div class="header__nav mobile-nav d-flex flex-column first-section first-section_padding">
            <div class="mobile-nav__row">
                <div class="mobile-nav__top-nav">
                    <div class="header__lang">
                        <a href="#"><span class="header__lang-icon mobile"></span>ENG</a>
                    </div>
                    <div class="header__phone">
                        <a href="tel:+78124494712">+7 (812) 449 47 12</a>
                    </div>
                </div>
            </div>
            <div class="mobile-nav__row">
                <div class="mobile-nav__middle-nav">
                    <div class="header__menu">
                        <nav>
                            <ul>
                                <li><a href="index.php" class="current">Главная</a></li>
                                <li><a href="about-page.php">О компании</a></li>
                                <li><a href="calc-page.php">Расчет стоимости</a></li>
                                <li><a href="services-page.php">Услуги</a></li>
                                <li><a href="fleet-page.php">Флот</a></li>
                                <li><a href="geo-page.php">География</a></li>
                                <li><a href="contacts-page.php">Контакты</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="mobile-nav__row d-flex justify-content-center align-items-end flex-grow-1">
                <div class="mobile-nav__bottom-nav">
                    <a href="tel:+78124494712" class="link link_phone"></a>
                </div>
            </div>

        </div>
        <button class="hamburger hamburger--squeeze header__hamburger" type="button">
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
        </button>
    </header>
    <main>