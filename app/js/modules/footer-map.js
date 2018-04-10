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
                    mapZoomMobile = 13;

                var map = new google.maps.Map(document.getElementById('footer-map'), {
                    disableDefaultUI: true
                });

                var MAX_ICON_WIDTH = 50;

                markers.forEach(function (marker) {
                    var icon = new Image();

                    icon.addEventListener('load', function () {
                        var iconWidth = icon.naturalWidth;
                        var iconHeight = icon.naturalHeight;
                        var k = 1;

                        if (iconWidth > MAX_ICON_WIDTH) {
                            k = MAX_ICON_WIDTH / iconWidth;
                        }

                        new google.maps.Marker({
                            icon: {
                                url: marker.icon,
                                size: new google.maps.Size(iconWidth, iconHeight),
                                scaledSize: new google.maps.Size(iconWidth * k, iconHeight * k),
                                origin: new google.maps.Point(0, 0),
                                anchor: new google.maps.Point(iconWidth * k / 2, iconHeight * k / 2)
                            },
                            position: {lat: +marker.coordinates[0], lng: +marker.coordinates[1]},
                            map: map
                        });
                    });

                    icon.src = marker.icon;
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