+function () {
    try {
        var footer = document.querySelector('.footer');

        if (footer) {
            var mapScript = document.createElement('script');
            var slides = document.querySelectorAll('.footer_map_contacts_slide');
            var markers = [];

            Array.prototype.forEach.call(slides, function (slide) {
                var marker = {};

                marker.coordinates = slide.dataset.mapcoordinates.split(',');
                marker.icon = slide.dataset.markericon;

                markers.push(marker);
            });

            mapScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAG8sutyHg4ISwG95Fg4iEOzvlkE6yecE8');
            mapScript.setAttribute('async', 'async');
            mapScript.setAttribute('defer', 'defer');

            document.body.appendChild(mapScript);

            mapScript.addEventListener('load', initFooterMap);

            function initFooterMap () {
                var mapCenter = {lat: 46.468676, lng: 30.839451},
                    mapCenterMobile = {lat: 46.456719, lng: 30.735203},
                    mapZoom = 12,
                    mapZoomMobile = 13,
                    mapMarkers = [];

                var map = new google.maps.Map(document.getElementById('footer-map'), {
                    disableDefaultUI: true
                });

                var MAX_ICON_WIDTH = 50;
                var MAP_ZOOM_MARKER_CLICKED = 14;
                var OPACITY_DEFAULT = 0.5;

                markers.forEach(function (marker) {
                    var icon = new Image();

                    icon.addEventListener('load', function () {
                        var iconWidth = icon.naturalWidth;
                        var iconHeight = icon.naturalHeight;
                        var k = 1;

                        if (iconWidth > MAX_ICON_WIDTH) {
                            k = MAX_ICON_WIDTH / iconWidth;
                        }

                        var mapMarker = new google.maps.Marker({
                            icon: {
                                url: marker.icon,
                                size: new google.maps.Size(iconWidth * k, iconHeight * k),
                                scaledSize: new google.maps.Size(iconWidth * k, iconHeight * k),
                                origin: new google.maps.Point(0, 0),
                                anchor: new google.maps.Point(iconWidth * k / 2, iconHeight * k / 2)
                            },
                            opacity: OPACITY_DEFAULT,
                            position: {lat: +marker.coordinates[0], lng: +marker.coordinates[1]},
                            map: map,
                            cursor: 'pointer'
                        });

                        google.maps.event.addListener(mapMarker, 'click', function() {
                            map.setZoom(MAP_ZOOM_MARKER_CLICKED);

                            setTimeout(function() {
                                map.panTo(mapMarker.getPosition());
                            }, 15);

                            mapMarkers.forEach(function(item) {
                                item.setOpacity(OPACITY_DEFAULT)
                            });

                            mapMarker.setOpacity(1);

                            window.MAP_CONTACT_SLIDER.slick('slickGoTo', mapMarkers.indexOf(mapMarker))
                        });

                        mapMarkers.push(mapMarker)
                    });

                    icon.src = marker.icon;
                });

                window.MAP_CONTACT_SLIDER.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                    google.maps.event.trigger(mapMarkers[nextSlide], 'click')
                });

                google.maps.event.addListener(map, 'mouseover', function() {
                    window.MAP_CONTACT_SLIDER.slick('slickPause')
                });

                google.maps.event.addListener(map, 'mouseout', function() {
                    window.MAP_CONTACT_SLIDER.slick('slickPlay')
                });

                // mobile map
                var mediaQuery = window.matchMedia("(max-width: 1200px)").matches;

                if (mediaQuery) {
                    map.setCenter(mapCenterMobile);
                    map.setZoom(mapZoomMobile);
                } else {
                    map.setCenter(mapCenter);
                    map.setZoom(mapZoom);
                }
            }
        }
    } catch (e) {
        console.error(e)
    }
}();