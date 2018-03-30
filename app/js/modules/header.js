+function () {
    try {
        var header = document.querySelector('.header');

        if (header) {
            var languagesMobile = header.querySelector('.header_info_lang_m'),
                burger = header.querySelector('.header_burger'),
                headerMenu = header.querySelector('.header_nav');

            headerResize();
            window.addEventListener('resize', headerResize);

            function headerResize () {
                var mq = window.matchMedia("(max-width: 1200px)").matches;

                headerUnmobile();

                if (mq) headerMobile();
            }

            function languagesToggle (event) {
                event.stopPropagation();
                languagesMobile.classList.toggle('open');
            }

            function languagesClose () {
                languagesMobile.classList.remove('open');
            }

            function menuOpenToggle () {
                headerMenu.classList.toggle('open');
                burger.classList.toggle('open')
            }

            function headerMobile () {
                var bodyMarginTop = header.offsetHeight;
                header.classList.add('fixed');
                document.body.style.marginTop = bodyMarginTop + 'px';

                languagesMobile.addEventListener('click', languagesToggle);
                document.body.addEventListener('click', languagesClose);
                burger.addEventListener('click', menuOpenToggle);
            }

            function headerUnmobile () {
                document.body.style.marginTop = 0;
                header.classList.remove('fixed');

                languagesMobile.removeEventListener('click', languagesToggle);
                document.body.removeEventListener('click', languagesClose);
                burger.removeEventListener('click', menuOpenToggle);
            }
        }
    } catch (e) {
        console.log(e)
    }
}();