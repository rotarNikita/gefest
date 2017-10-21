+function () {
    var popupCallers = document.querySelectorAll('.popup-caller');

    if (popupCallers.length) {
        var blackout = document.createElement('div');
        blackout.className = "popup-blackout";
        document.body.appendChild(blackout);

        Array.prototype.forEach.call(popupCallers, function(popupCaller) {
            var targetPopup = document.getElementById(popupCaller.dataset.target);

            popupCaller.addEventListener('click', function(event) {
                event.preventDefault();
                $(blackout).show(300);
                $(targetPopup).show(300)
            });

            blackout.addEventListener('click', function() {
                $(this).hide(300);
                $(targetPopup).hide(300);
            })
        })
    }
}();