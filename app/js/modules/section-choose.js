+function () {
    try {
        var flats = document.querySelectorAll('.section_choose_flat');
        var svg = document.querySelectorAll('.section_choose');

        if (svg.length) {
            Array.prototype.forEach.call(svg, function (item) {
                var image = item.querySelector('.section_choose_main-image');
                var img = new Image();

                img.addEventListener('load', function () {
                    image.setAttribute('width', img.naturalWidth + '');
                    image.setAttribute('height', img.naturalHeight + '');

                    item.setAttribute('viewBox', '0 0 ' + img.naturalWidth + ' ' + img.naturalHeight);
                });

                img.src = image.href.baseVal;
            })
        }

        if (flats.length) {
            var interval = 4000,
                duration = interval / flats.length;

            var intervals = [];

            function clearAllIntervals () {
                intervals.forEach(function (interval) {
                    interval.stop()
                })
            }

            function startAllIntervals () {
                intervals.forEach(function (interval) {
                    interval.start()
                })
            }

            Array.prototype.forEach.call(flats, function (flat, flatIndex) {
                var flatPath = flat.querySelector('.section_choose_path');
                var fillColor = flatPath.getAttribute('fill');
                var isActive = flat.classList.contains('active');

                if (!isActive) {
                    flat.addEventListener('click', function () {
                        window.open(this.dataset.href)
                    });

                    flat.addEventListener('mouseenter', function () {
                        hover();
                        clearAllIntervals();
                        clearTimeout(animationTimeout);
                    });
                    flat.addEventListener('mouseleave', function () {
                        unHover();
                        startAllIntervals();
                    });

                    function hover () {
                        flat.classList.add('hover');
                        flatPath.style.fill = fillColor;
                    }

                    function unHover () {
                        flat.classList.remove('hover');
                        flatPath.style.fill = 'transparent';
                    }

                    var animationInterval = null;
                    var animationTimeout = null;

                    var animation = {
                        start: function () {
                            animationInterval = setTimeout(function () {
                                animationInterval = setInterval(function () {
                                    hover();

                                    animationTimeout = setTimeout(function () {
                                        unHover()
                                    }, duration)
                                }, interval)
                            }, duration * flatIndex)
                        },
                        stop: function () {
                            clearInterval(animationInterval);
                            clearTimeout(animationInterval);
                        }
                    };

                    intervals.push(animation);
                } else {
                    flat.classList.add('hover');
                    flatPath.style.fill = fillColor;
                    flatPath.style.stroke = fillColor.replace('0.8', '1');
                    flatPath.style.strokeWidth = '5';
                }
            });

            startAllIntervals();
        }
    } catch (e) {
        console.error(e)
    }
}();