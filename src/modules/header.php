<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <title>БМБА</title>
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="assets/css/normalize.css">
    <link rel="stylesheet" href="assets/css/bootstrap/bootstrap-grid.css">
    <link rel="stylesheet" href="assets/css/swiper-bundle.min.css">
    <link rel="stylesheet" href="assets/css/main.css">
    <script defer src="assets/js/app.min.js"></script>
</head>

<body>
<div class="request-popup">
    <div class="request-popup__block">
        <form action="#" class="form request-popup__form">
            <div class="form__title">Оформление заявки</div>
            <div class="form__subtitle">Укажите свои данные и мы свяжемся с Вами в течение дня</div>
            <div class="form__group">
                <div class="form__input name valid"><input type="text" placeholder="Имя"></div>
                <div class="form__input email"><input type="email" placeholder="E-mail"></div>
                <div class="form__input phone"><input type="tel" placeholder="Телефон"></div>
            </div>
            <small>Нажимая на кнопку “отправить” вы соглашаетесь c политикой обработки персональных
                данных</small>
            <div class="form__submit">
                <button class="link ">Отправить</button>
            </div>
        </form>
    </div>
</div>
<div class="success-popup">
    <div class="success-popup__block">
        <div class="success-popup__title">Спасибо</div>
        <div class="success-popup__subtitle">Ваша заявка отправлена</div>
        <button class="link success-popup__close">Закрыть</button>
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
        <div class="header__menu transparent-border_right">
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