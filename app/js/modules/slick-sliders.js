+function() {
    var homeSliderTop = $('.home_slider-top_slider');

    if (homeSliderTop.length) {
        homeSliderTop.slick({
            dots: true,
            adaptiveHeight: true
        })
    }
}();