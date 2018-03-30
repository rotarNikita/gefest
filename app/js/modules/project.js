+function () {
    try {
        var projectPage = document.querySelector('.projects');

        if (projectPage) {
            // description hide
            var sliders = projectPage.querySelectorAll('.projects_item');

            Array.prototype.forEach.call(sliders, function (slider) {
                var text = slider.querySelector('.projects_item_description'),
                    button = slider.querySelector('.single-object_slider_zoom');

                button.addEventListener('click', function () {
                    text.classList.toggle('close');
                });

                text.addEventListener('click', function () {
                    this.classList.remove('close');
                })
            })
        }
    } catch (e) {
        console.log(e)
    }
}();
