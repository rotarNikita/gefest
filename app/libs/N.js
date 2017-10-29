+function () {
    var N = {};

    N.offset = function (elem) {
        if (elem.getBoundingClientRect) {
            return getOffsetRect(elem)
        } else {
            return getOffsetSum(elem)
        }
    };

    N.checkView = function (options) {
        var offsetTop = options.offset || 100,
            el = options.element || null,
            callback = options.callback;

        var elOffsetTop, windowHeight;

        window.addEventListener('scroll', view);
        window.addEventListener('resize', resize);
        resize();
        view();

        function view () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

            if (scrollTop + windowHeight >= elOffsetTop + offsetTop && scrollTop <= elOffsetTop + offsetTop) {
                callback();
                window.removeEventListener('scroll', view);
                window.removeEventListener('resize', resize);
            }
        }

        function resize () {
            elOffsetTop = N.offset(el).top;
            windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        }
    };

    N.animate = function (options) {
        var duration = options.duration || 300,
            timing = options.timing || function (timeFraction) { return timeFraction },
            start = performance.now();

        requestAnimationFrame(function animate(time) {
            var timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            var progress = timing(timeFraction);

            options.do(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    };

    function getOffsetSum(elem) {
        var top = 0,
            left = 0;

        while(elem) {
            top = top + parseFloat(elem.offsetTop);
            left = left + parseFloat(elem.offsetLeft);
            elem = elem.offsetParent
        }

        return {top: Math.round(top), left: Math.round(left)}
    }

    function getOffsetRect(elem) {
        var box = elem.getBoundingClientRect();

        var body = document.body;
        var docElem = document.documentElement;

        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;

        var top  = box.top +  scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left) }
    }


    window.N = N;

    return N
}();