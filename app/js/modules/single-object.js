+function () {
    var objectPage = document.querySelector('.single-object');

    if (objectPage) {
        // aside list
        var aside = objectPage.querySelector('.single-object_aside');

        var navItems = aside.querySelectorAll('.single-object_aside_li'),
            navItemsActive = aside.querySelector('.single-object_aside_li.active'),
            navLine = aside.querySelector('.line'),
            navUl = aside.querySelector('.single-object_aside_ul'),
            navUlHeight = navUl.offsetHeight;

        navLine.style.top = navItemsActive.offsetTop + navItemsActive.offsetHeight / 2 + 'px';
        navLine.style.bottom = navUlHeight - navLine.offsetTop + 'px';

        window.addEventListener('load', function () {
            navUlHeight = navUl.offsetHeight;
            navLine.style.top = navItemsActive.offsetTop + navItemsActive.offsetHeight / 2 + 'px';
            navLine.style.bottom = navUlHeight - navLine.offsetTop + 'px';
        });

        Array.prototype.forEach.call(navItems, function (navItem) {
            // link in li
            var link = navItem.children[1],
                linkTarget = link.attributes.href;

            link.addEventListener('click', function (event) {
                event.preventDefault();
            });

            navItem.addEventListener('click', function () {
                navItemsActive.classList.remove('active');
                this.classList.add('active');
                lineGoTo(this);

                navItemsActive = this;
            });
        });

        var stopAnimationLineTop = function () {},
            stopAnimationLineBottom = function () {};

        function lineGoTo (toNavItem) {
            stopAnimationLineBottom();
            stopAnimationLineTop();

            var top = parseInt(navLine.style.top),
                bottom = parseInt(navLine.style.bottom),
                newTop = toNavItem.offsetTop + toNavItem.offsetHeight / 2,
                newBottom = navUlHeight - newTop,
                deltaTop = newTop - top,
                deltaBottom = newBottom - bottom;

            if (deltaTop > deltaBottom) {
                stopAnimationLineBottom = N.animate({
                    duration: 300,
                    do: function (progress) {
                        navLine.style.bottom = bottom + deltaBottom * progress + 'px'
                    },
                    timing: easeInOut,
                    callback: function () {
                        stopAnimationLineTop = N.animate({
                            duration: 300,
                            do: function (progress) {
                                navLine.style.top = top + deltaTop * progress + 'px'
                            },
                            timing: easeInOut
                        })
                    }
                })
            } else {
                stopAnimationLineTop = N.animate({
                    duration: 300,
                    do: function (progress) {
                        navLine.style.top = top + deltaTop * progress + 'px'
                    },
                    timing: easeInOut,
                    callback: function () {
                        stopAnimationLineBottom = N.animate({
                            duration: 300,
                            do: function (progress) {
                                navLine.style.bottom = bottom + deltaBottom * progress + 'px'
                            },
                            timing: easeInOut
                        })
                    }
                })
            }
        }

        function easeInOut (t) {
            return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        // aside scroll
        var maxTop, maxBottom, bottom;

        asideVariablesInit();
        window.addEventListener('load', asideVariablesInit);

        asideScroll();
        window.addEventListener('scroll', asideScroll);

        function asideVariablesInit () {
            maxTop = document.querySelector('.header').offsetHeight;
            maxBottom = N.offset(document.querySelector('.footer_after')).top;
            bottom = document.querySelector('.footer_after').offsetHeight;

            asideScroll();
        }

        function asideScroll () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
                scrollBottom = scrollTop + window.innerHeight;

            if (scrollTop > maxTop && scrollBottom < maxBottom) {
                aside.className = 'single-object_aside';
                aside.classList.add('fixed');
            } else if (scrollTop <= maxTop) {
                aside.className = 'single-object_aside';
                aside.style.top = maxTop + 'px';
                aside.classList.add('top');
            } else {
                aside.className = 'single-object_aside';
                aside.style.bottom = bottom + 'px';
                aside.classList.add('bottom');
            }
        }
    }
}();