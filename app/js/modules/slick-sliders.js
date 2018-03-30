+function() {
    try {
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

        // home objects slider
        var homeObjectsSlider = $('.home_objects_slider');

        if (homeObjectsSlider.length) {
            homeObjectsSlider.slick({
                adaptiveHeight: true,
                rows: 2,
                slidesPerRow: 3,
                //checkRow: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesPerRow: 2,
                            rows: 2
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesPerRow: 1,
                            rows: 1,
                            checkRows: true
                        }
                    }
                ]
            });
        }

        // home news slider
        var homeNewsSlider = $('.home_news_slider');

        if (homeNewsSlider) {
            homeNewsSlider.slick({
                rows: 2,
                slidesPerRow: 2,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesPerRow: 1,
                            rows: 1,
                            checkRows: true
                        }
                    }
                ]
            })
        }

        // footer
        var footerSlider = $('.footer_map_contacts_slider');

        if (footerSlider.length) {
            footerSlider.slick({
                adaptiveHeight: true,
                nextArrow: $('.footer_map_contacts .slick-arrow.slick-next'),
                prevArrow: $('.footer_map_contacts .slick-arrow.slick-prev')
            })
        }

        // object page slider
        var objectPageSlider = $('.single-object_slider_slides');

        if (objectPageSlider) {
            objectPageSlider.slick({
                adaptiveHeight: true
            });

            var zoomLink = $('.single-object_slider_zoom');

            zoomLink.attr('href', $('.single-object_slider_slide[data-slick-index=' + 0 + '] img').attr('src'));
            objectPageSlider.on('afterChange', function (event, slick, currentSlide) {
                zoomLink.attr('href', $('.single-object_slider_slide[data-slick-index=' + currentSlide + '] img').attr('src'))
            });
        }
    } catch (e) {
        console.error(e)
    }
}();