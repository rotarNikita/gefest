+function () {
    var footer = document.querySelector('.footer');

    if (footer) {
        var mapScript = document.createElement('script');

        mapScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAG8sutyHg4ISwG95Fg4iEOzvlkE6yecE8');
        mapScript.setAttribute('async', 'async');
        mapScript.setAttribute('defer', 'defer');

        document.body.appendChild(mapScript);

        mapScript.addEventListener('load', initFooterMap);

        function initFooterMap () {
            var mapCenter = {lat: 46.468676, lng: 30.839451};

            var map = new google.maps.Map(document.getElementById('footer-map'), {
                zoom: 12,
                center: mapCenter,
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
            })
        }
    }
}();