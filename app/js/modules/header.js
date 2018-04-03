+function () {
    try {
        var header = document.querySelector('.header');

        if (header) {
            var languagesMobile = header.querySelector('.header_info_lang_m'),
                burger = header.querySelector('.header_burger'),
                headerMenu = header.querySelector('.header_nav'),
                phonesMobile = header.querySelector('.header_info_contacts_m'),
                phonesMobileIcon = phonesMobile.querySelector('.header_info_contacts_m_icon'),
                phonesMobileDropdown = phonesMobile.querySelector('.header_info_contacts_m_dropdown');


            headerResize();
            window.addEventListener('resize', headerResize);

            function headerResize () {
                var mq = window.matchMedia("(max-width: 1200px)").matches;

                headerUnmobile();

                if (mq) headerMobile();
            }

            function phonesMobileToggle (event) {
                event.stopPropagation();
                phonesMobileDropdown.classList.toggle('open');
            }

            function phonesMobileClose (event) {
                phonesMobileDropdown.classList.remove('open');
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
                phonesMobileIcon.addEventListener('click', phonesMobileToggle);
                document.body.addEventListener('click', languagesClose);
                document.body.addEventListener('click', phonesMobileClose);
                burger.addEventListener('click', menuOpenToggle);
            }

            function headerUnmobile () {
                document.body.style.marginTop = 0;
                header.classList.remove('fixed');

                languagesMobile.removeEventListener('click', languagesToggle);
                phonesMobileIcon.removeEventListener('click', phonesMobileToggle);
                document.body.removeEventListener('click', phonesMobileClose);
                document.body.removeEventListener('click', languagesClose);
                burger.removeEventListener('click', menuOpenToggle);
            }
        }
    } catch (e) {
        console.error(e)
    }
}();