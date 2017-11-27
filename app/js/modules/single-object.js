+function () {
    var objectPage = document.querySelector('.single-object');

    if (objectPage) {
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

        function easeInOut (t) {
            return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function imgMapResize () {
            mapPath.style.strokeWidth = 100 / imgMap.getBoundingClientRect().width;
        }

        // video
        var videoWrapper = document.querySelector('.single-object_video_wrapper'),
            video = videoWrapper.getElementsByTagName('video')[0],
            playButton = videoWrapper.querySelector('.play-button');

        if (navigator.userAgent.indexOf('Safari') === -1 || navigator.userAgent.indexOf('Chrome') !== -1) {
            if (video.readyState >= 4) videoLoaded();
            else video.addEventListener('canplaythrough', videoLoaded);
        } else {
            video.setAttribute('controls', true);
            video.setAttribute('autoplay', true);

            var customStyle = document.createElement('style');
            customStyle.innerHTML = '.single-object_video_wrapper:after {' +
                'content: none;' +
                '}' +
                '.single-object_video_center {' +
                'display: none;' +
                '}';

            videoWrapper.appendChild(customStyle);
        }

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

            videoWrapper.addEventListener('click', function () {
                this.classList.remove('playing');

                video.pause();
            });

            video.addEventListener('ended', videoWrapper.click.bind(videoWrapper));
        }

        // svg choose stage
        var svgStageItems = document.querySelectorAll('.single-object_choose_svg_group'),
            mediaQuery = false,
            deltaAnimationMobile = 500,
            intervalAnimationMobile = 4000;

        svgChooseResize();
        window.addEventListener('resize', svgChooseResize);

        function svgChooseResize () {
            mediaQuery = window.matchMedia('(max-width: 1201px)').matches;
        }

        Array.prototype.forEach.call(svgStageItems, function (svgStageItem, svgStageItemIndex) {
            var path = svgStageItem.querySelector('.single-object_choose_svg_path'),
                text = svgStageItem.querySelector('.single-object_choose_svg_description'),
                href = svgStageItem.dataset.href,
                textHover = false,
                hover = false;

            path.addEventListener('mouseenter', function () {
                show();
            });

            path.addEventListener('mouseleave', function () {
                setTimeout(function () {
                    if (!textHover) {
                        hide();
                    }
                }, 0);
            });

            text.addEventListener('mouseenter', function () {
                textHover = true
            });

            text.addEventListener('mouseleave', function () {
                textHover = false;
                hide();
            });

            svgStageItem.addEventListener('click', function () {
               if (hover) window.location = href;
            });

            if (mediaQuery) {
                setInterval(function () {
                    show();
                    setTimeout(hide, deltaAnimationMobile + svgStageItemIndex * deltaAnimationMobile)
                }, intervalAnimationMobile + svgStageItemIndex * deltaAnimationMobile);

                text.children[0].setAttribute('d', 'M 169 378 h 192 v 45 l 10 10 l -10 10 v 45 h -192 Z');
                text.children[1].setAttribute('style', 'font-size: 24px;');
                text.children[1].children[0].setAttribute('style', 'font-size: 26px;');
            }

            function show () {
                hover = true;
                path.classList.add('hover');

                if (!mediaQuery) {
                    text.style.display = 'block';
                    text.classList.add('hover');
                }
            }

            var hideTimeout;
            function hide () {
                hover = false;
                path.classList.remove('hover');

                if (!mediaQuery) {
                    text.classList.remove('hover');
                    clearTimeout(hideTimeout);
                    hideTimeout = setTimeout(function () {
                        if (!hover) text.style.display = 'none';
                    }, 300)
                }
            }
        })
    }
}();