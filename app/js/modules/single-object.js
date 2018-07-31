+function () {
    try {
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
            try {
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
            } catch (e) {
                console.error(e)
            }

            // svg choose stage
            var svg = document.querySelectorAll('.single-object_choose_svg');

            if (svg.length) {
                Array.prototype.forEach.call(svg, function (item) {
                    var image = item.querySelector('.single-object_choose_svg_main-image');
                    var img = new Image();

                    img.addEventListener('load', function () {
                        image.setAttribute('width', img.naturalWidth + '');
                        image.setAttribute('height', img.naturalHeight + '');

                        item.setAttribute('viewBox', '0 0 ' + img.naturalWidth + ' ' + img.naturalHeight);
                    });

                    img.src = image.href.baseVal;
                })
            }

            var svgStageItems = document.querySelectorAll('.single-object_choose_svg_group'),
                mediaQuery = false,
                intervalAnimationMobile = 4000,
                deltaAnimationMobile = intervalAnimationMobile / svgStageItems.length,
                intervals = [];

            intervals.stopAll = function () {
                intervals.forEach(function (interval) {
                    interval.stop();
                })
            };

            intervals.startAll = function () {
                intervals.forEach(function (interval) {
                    interval.start();
                })
            };

            svgChooseResize();
            window.addEventListener('resize', svgChooseResize);

            function svgChooseResize () {
                mediaQuery = window.matchMedia('(max-width: 1201px)').matches;
            }

            Array.prototype.forEach.call(svgStageItems, function (svgStageItem, svgStageItemIndex) {
                try {
                    var path = svgStageItem.querySelector('.single-object_choose_svg_path'),
                        pathColor = path.getAttribute('fill'),
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

                    if (text) {
                        text.addEventListener('mouseenter', function () {
                            textHover = true;
                        });

                        text.addEventListener('mouseleave', function () {
                            textHover = false;
                            hide();
                        });
                    }

                    svgStageItem.addEventListener('click', function () {
                        if (hover || mediaQuery) window.open(href);
                    });

                    svgStageItem.addEventListener('mouseenter', function () {
                        intervals.stopAll();
                        clearTimeout(thisTimeout);
                    });

                    svgStageItem.addEventListener('mouseleave', function () {
                        intervals.startAll();
                    });

                    function show () {
                        hover = true;
                        path.classList.add('hover');
                        path.style.fill = pathColor;

                        if (!mediaQuery && text) {
                            text.style.display = 'block';
                            text.classList.add('hover');
                        }
                    }

                    var hideTimeout = null;
                    function hide () {
                        hover = false;
                        path.classList.remove('hover');
                        path.style.fill = 'transparent';

                        if (!mediaQuery && text) {
                            text.classList.remove('hover');
                            clearTimeout(hideTimeout);
                            hideTimeout = setTimeout(function () {
                                if (!hover) text.style.display = 'none';
                            }, 300)
                        }
                    }


                    var thisInterval = null;
                    var thisTimeout = null;
                    var interval = {
                        start: function () {
                            thisInterval = setTimeout(function () {
                                thisInterval = setInterval(function () {
                                    show();

                                    thisTimeout = setTimeout(hide, deltaAnimationMobile);
                                }, intervalAnimationMobile)
                            }, svgStageItemIndex * deltaAnimationMobile);
                        },
                        stop: function () {
                            clearInterval(thisInterval);
                            clearTimeout(thisInterval);
                        }
                    };

                    intervals.push(interval);
                } catch (e) {
                    console.error(e);
                }
            });

            intervals.startAll();
        }
    } catch (e) {
        console.error(e)
    }
}();