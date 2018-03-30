+function () {
    try {
        var range = $( ".select-apartment_form_range .range" );

        if (range.length) {
            var from = $('.select-apartment_form_range .from'),
                to = $('.select-apartment_form_range .to'),
                min = +from[0].getAttribute('min'),
                max = +from[0].getAttribute('max');

            range.slider({
                range: true,
                min: min,
                max: max,
                values: [ 17, 81 ],
                slide: function( event, ui ) {
                    from.val(ui.values[0]);
                    to.val(ui.values[1]);
                }
            });

            from.val(range.slider("values", 0));
            to.val(range.slider("values", 1));

            if (isTouchDevice()) {
                from[0].removeAttribute('readonly');
                to[0].removeAttribute('readonly');

                from[0].setAttribute('type', 'number');
                to[0].setAttribute('type', 'number');

                from[0].addEventListener('change', function (event) {
                    if (+this.value > +to[0].value) this.value = to[0].value;
                    if (+this.value < min) this.value = min;

                    range.slider('values', 0, this.value)
                });

                to[0].addEventListener('change', function () {
                    if (+this.value < +from[0].value) this.value = from[0].value;
                    if (+this.value > max) this.value = max;

                    range.slider('values', 1, this.value)
                })
            }

            function isTouchDevice () {
                return 'ontouchstart' in window || navigator.maxTouchPoints;
            }
        }

        var selectApartmentForm = document.querySelector('.select-apartment_form');

        if (selectApartmentForm) {
            selectApartmentForm.addEventListener('submit', function (event) {
                event.preventDefault();
            })
        }
    } catch (e) {
        console.log(e)
    }
}();