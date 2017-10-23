+function() {
    // home slider top
    var homeSliderTop = $('.home_slider-top_slider');

    if (homeSliderTop.length) {
        homeSliderTop.slick({
            dots: true,
            adaptiveHeight: true
        })
    }

    // slider social projects
    var homeProjectSlider = $('.home_project_slider');

    if (homeProjectSlider.length) {
        homeProjectSlider.slick({
            adaptiveHeight: true
        });

        var homeProject = document.querySelector('.home_project');

        homeProjectSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            var imageSrc = document.querySelector('.home_project_slider [data-slick-index="' + nextSlide + '"]').dataset.back;

            homeProject.style.backgroundImage = 'url(' + imageSrc + ')'
        });
    }

    // objects slider
    var homeObjectsSlider = $('.home_objects_slider')

    if (homeObjectsSlider.length) {
        homeObjectsSlider.slick({
            adaptiveHeight: true
        })
    }
}();