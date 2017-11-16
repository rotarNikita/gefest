+function () {
    var flats = document.querySelectorAll('.section_choose_flat');

    if (flats.length) {
        Array.prototype.forEach.call(flats, function (flat) {
            flat.addEventListener('click', function () {
                window.location = this.dataset.href;
            })
        })
    }
}();