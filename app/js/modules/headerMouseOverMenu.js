+function() {

    var headerNav = document.querySelector('.header_nav');

    if (headerNav) {
        var hoverLine = headerNav.querySelector('.hover_line'),
            itemActive = headerNav.querySelector('li.active'),
            items = headerNav.querySelectorAll('li');


        window.addEventListener('load', function () {
            lineInit();
        });
        window.addEventListener('resize', function () {
            lineInit();
        });

        Array.prototype.forEach.call(items, function (item) {
            item.addEventListener('mouseover', function () {
                lineInit(this)
            });

            item.addEventListener('mouseout', function () {
                lineInit()
            });
        });

        function lineInit (element) {
            element = element || itemActive;

            hoverLine.style.left = N.offset(element).left + 'px';
            hoverLine.style.width = element.offsetWidth + 'px';
        }
    }
}();