+function() {
    var homeSliderTop = $('.home_slider-top_slider');

    if (homeSliderTop.length) {
        homeSliderTop.slick({
            dots: true,
            adaptiveHeight: true
        })
    }

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
}();