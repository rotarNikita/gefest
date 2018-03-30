+function () {
    try {
        var footer = document.querySelector('.footer');

        if (footer) {
            var mapScript = document.createElement('script');

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

                var MARKER_ICON = {
                    url: '../img/components/footer/maker.png',
                    size: new google.maps.Size(512, 444),
                    scaledSize: new google.maps.Size(51, 44),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(25, 22)
                };

                var dataMarkers = [
                    [46.461445, 30.712205],
                    [46.473367, 30.740436],
                    [46.448598, 30.741259]
                ];

                var markers = [];

                dataMarkers.forEach(function (dataMarker, i) {
                    markers[i] = new google.maps.Marker({
                        icon: MARKER_ICON,
                        position: {lat: dataMarker[0], lng: dataMarker[1]},
                        map: map
                    });
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