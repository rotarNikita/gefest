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

        // description map
        var imgMap = document.getElementById('single-object-description-map'),
            mapPath = document.getElementById('single-object-description-map-path');

        imgMap.setAttribute('xlink:href', 'https://maps.googleapis.com/maps/api/staticmap?center=46.441159,30.750322&zoom=16&size=' + 640 + 'x' + 640 + '&scale=2&maptype=roadmap' +
            '&markers=46.439614,30.747054' +
            '&key=AIzaSyAG8sutyHg4ISwG95Fg4iEOzvlkE6yecE8');

        imgMapResize();
        window.addEventListener('resize', imgMapResize);

        var gradient = document.getElementById('gradient'),
            stop1Offset = parseInt(gradient.children[0].getAttribute('offset')),
            stop2Offset = parseInt(gradient.children[1].getAttribute('offset')),
            path = document.getElementById('single-object-description-map-path'),
            pathLength = path.getTotalLength();

        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;

        window.addEventListener('load', function () {
            N.checkView({
                offsetTop: 1,
                element: document.getElementById('single-object-description-map-marker'),
                callback: function () {
                    path.classList.add('active');

                    setTimeout(function () {
                        N.animate({
                            duration: 1000,
                            timing: easeInOut,
                            do: function (progress) {
                                gradient.children[0].setAttribute('offset', stop1Offset - stop1Offset * progress + '%');
                                gradient.children[1].setAttribute('offset', stop2Offset - stop2Offset * progress + '%');
                            }
                        })
                    }, 1000)
                }
            })
        });

        function imgMapResize () {
            mapPath.style.strokeWidth = 100 / imgMap.getBoundingClientRect().width;
        }

        // video
        var videoWrapper = document.querySelector('.single-object_video_wrapper'),
            video = videoWrapper.getElementsByTagName('video')[0],
            playButton = videoWrapper.querySelector('.play-button');

        if (video.readyState >= 4) videoLoaded();
        else video.addEventListener('canplaythrough', videoLoaded);


        function videoLoaded () {
            playButton.addEventListener('mousedown', function () {
                this.classList.add('mouse-down');
            });

            document.body.addEventListener('mouseup', function () {
                playButton.classList.remove('mouse-down');
            });

            playButton.addEventListener('click', function (event) {
                event.stopPropagation();

                videoWrapper.classList.add('playing');
                playButton.classList.remove('mouse-down');

                video.play();
            });

            videoWrapper.addEventListener('click', function (event) {
                this.classList.remove('playing');

                video.pause();
            });
            
            video.addEventListener('ended', videoWrapper.click.bind(videoWrapper));
        }
    }
}();