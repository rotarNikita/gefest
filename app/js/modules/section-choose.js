+function () {
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

        Array.prototype.forEach.call(flats, function (flat, flatIndex) {
            var flatPath = flat.querySelector('.section_choose_path');
            var fillColor = flatPath.getAttribute('fill');

            flat.addEventListener('click', function () {
                window.location = this.dataset.href;
            });

            flat.addEventListener('mouseenter', hover);

            flat.addEventListener('mouseleave', unHover);

            function hover () {
                flat.classList.add('hover');
                flatPath.style.fill = fillColor;
            }

            function unHover () {
                flat.classList.remove('hover');
                flatPath.style.fill = 'transparent';
            }

            setTimeout(function () {
                setInterval(function () {
                    hover();

                    setTimeout(function () {
                        unHover();
                    }, duration);
                }, interval)
            }, duration * flatIndex);
        })
    }
}();