+function () {
    var range = $( ".select-apartment_form_range .range" );

    if (range.length) {
        var from = $('.select-apartment_form_range .from'),
            to = $('.select-apartment_form_range .to');

        range.slider({
            range: true,
            min: 0,
            max: 120,
            values: [ 17, 81 ],
            slide: function( event, ui ) {
                from.val(ui.values[0]);
                to.val(ui.values[1]);
            }
        });

        from.val(range.slider("values", 0));
        to.val(range.slider("values", 1));
    }
}();