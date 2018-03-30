+function() {
    try {
        var headerNav = document.querySelector('.header_nav');

        if (headerNav) {
            var hoverLine = headerNav.querySelector('.hover_line'),
                itemActive = headerNav.querySelector('li.active'),
                items = headerNav.querySelectorAll('li');

            var desktop = false;
            window.addEventListener('load', resize);
            window.addEventListener('resize', resize);

            function initMenuListeners () {
                Array.prototype.forEach.call(items, function (item) {
                    item.addEventListener('mouseenter', mouseenter);
                    item.addEventListener('mouseleave', mouseleave);
                });
            }

            function mouseenter () {
                lineInit(this)
            }

            function mouseleave () {
                lineInit()
            }

            function removeMenuListeners () {
                Array.prototype.forEach.call(items, function (item) {
                    item.removeEventListener('mouseenter', mouseenter);
                    item.removeEventListener('mouseleave', mouseleave);
                });
            }

            function resize () {
                var mediaQuery = window.matchMedia('(max-width: 1200px)').matches;

                if (mediaQuery) {
                    if (desktop) removeMenuListeners();
                    desktop = false;
                } else {
                    if (desktop) removeMenuListeners();
                    lineInit();
                    initMenuListeners();
                    desktop = true;
                }
            }

            function lineInit (element) {
                element = element || itemActive;

                hoverLine.style.left = N.offset(element).left + 'px';
                hoverLine.style.width = element.offsetWidth + 'px';
            }
        }
    } catch (e) {
        console.log(e)
    }
}();