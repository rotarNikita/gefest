+function () {
    var flats = document.querySelectorAll('.section_choose_flat');

    if (flats.length) {
        var interval = 4000,
            duration = 500;

        Array.prototype.forEach.call(flats, function (flat, flatIndex) {
            flat.addEventListener('click', function () {
                window.location = this.dataset.href;
            });

            setInterval(function () {
                flat.classList.add('hover');
                setTimeout(function () {
                    flat.classList.remove('hover');
                }, duration)
            }, interval + duration * flatIndex)
        })
    }
}();