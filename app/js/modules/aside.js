+function () {
    // aside list
    var aside = document.querySelector('.single-object_aside');

    if (aside) {
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

        var scrollAnimationStop = function () {},
            targets = [];

        Array.prototype.forEach.call(navItems, function (navItem) {
            // link in li
            var link = navItem.children[1],
                target = document.getElementById(link.attributes.href.value.slice(1));

            targets.push(target);

            link.addEventListener('click', function (event) {
                event.preventDefault();
            });

            navItem.addEventListener('click', function () {
                navItemsActive.classList.remove('active');
                this.classList.add('active');
                lineGoTo(this);

                navItemsActive = this;

                scrollAnimationStop();
                window.removeEventListener('scroll', checkActiveLi);
                var currentScrollTop = window.pageYOffset || document.documentElement.scrollTop,
                    targetOffset = N.offset(target).top;

                scrollAnimationStop = N.animate({
                    duration: 1000,
                    timing: easeInOut,
                    do: function (progress) {
                        window.scrollTo(0, Math.round((currentScrollTop - currentScrollTop * progress) + targetOffset * progress));
                    },
                    callback: function () {
                        window.addEventListener('scroll', checkActiveLi);
                    }
                })
            });
        });

        window.addEventListener('scroll', checkActiveLi);

        var checkActiveLiMedia = false;
        function checkActiveLiResize () {
            checkActiveLiMedia = window.matchMedia('(max-width: 1200px)').matches;
        }

        checkActiveLiResize();
        window.addEventListener('resize', checkActiveLiResize);

        function checkActiveLi () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
                offsets = [];

            targets.forEach(function (target, i) {
                offsets[i] = N.offset(target).top;
            });

            for (var i = 0; i < offsets.length; i++) {
                if (offsets[i + 1]) {
                    if ((scrollTop >= offsets[i] && scrollTop < offsets[i + 1]) || scrollTop <= offsets[0]) {
                        setActiveLi(navItems[i]);
                        break;
                    }
                } else setActiveLi(navItems[i])
            }
        }

        function setActiveLi (navItem) {
            navItemsActive.classList.remove('active');
            navItem.classList.add('active');

            if (checkActiveLiMedia) {
                var newTop =  navItem.offsetTop + navItem.offsetHeight / 2;

                navLine.style.bottom = navUlHeight - newTop + 'px';
                navLine.style.top = newTop + 'px'
            } else lineGoTo(navItem);

            navItemsActive = navItem;
        }

        var stopAnimationLine = function () {};

        function lineGoTo (toNavItem) {
            stopAnimationLine();

            var top = parseInt(navLine.style.top),
                bottom = parseInt(navLine.style.bottom),
                newTop = toNavItem.offsetTop + toNavItem.offsetHeight / 2,
                newBottom = navUlHeight - newTop,
                deltaTop = newTop - top,
                deltaBottom = newBottom - bottom;

            if (deltaTop > deltaBottom) {
                stopAnimationLine = N.animate({
                    duration: 500,
                    do: function (progress) {
                        navLine.style.bottom = bottom + deltaBottom * progress + 'px'
                    },
                    timing: easeInOut,
                    callback: function () {
                        stopAnimationLine = N.animate({
                            duration: 500,
                            do: function (progress) {
                                navLine.style.top = top + deltaTop * progress + 'px'
                            },
                            timing: easeInOut
                        })
                    }
                })
            } else {
                stopAnimationLine = N.animate({
                    duration: 500,
                    do: function (progress) {
                        navLine.style.top = top + deltaTop * progress + 'px'
                    },
                    timing: easeInOut,
                    callback: function () {
                        stopAnimationLine = N.animate({
                            duration: 500,
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
        var maxTop, maxBottom, bottom,
            header = document.querySelector('.header'),
            footer = document.querySelector('.footer_after'),
            delta = 0;

        asideScroll();
        window.addEventListener('load', asideScroll);
        window.addEventListener('resize', asideScroll);
        window.addEventListener('scroll', asideScroll);

        function asideVariablesCalc () {
            var mediaQuery = window.matchMedia('(max-width: 1200px)').matches;

            if (mediaQuery) {
                maxTop = 0;
                delta = header.offsetHeight
            }
            else {
                maxTop = header.offsetHeight;
                delta = 0;
            }

            maxBottom = N.offset(footer).top;
            bottom = footer.offsetHeight;
        }

        function asideScroll () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
                scrollBottom = scrollTop + window.innerHeight;

            asideVariablesCalc();

            if (scrollTop > maxTop + delta && scrollBottom < maxBottom) {
                aside.className = 'single-object_aside fixed';
            } else if (scrollTop <= maxTop + delta) {
                aside.className = 'single-object_aside top';
                aside.style.top = maxTop + 'px';
            } else {
                aside.className = 'single-object_aside bottom';
                aside.style.bottom = bottom + 'px';
            }
        }
    }
}();