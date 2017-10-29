+function () {
    var homeAdvantagesBlock = document.querySelector('.home_advantages');

    if (homeAdvantagesBlock) {
        var svgMask = homeAdvantagesBlock.querySelector('.home_advantages_mask'),
            svgMainCircle = homeAdvantagesBlock.querySelector('.home_advantages_main-circle'),
            svgSmallCircles = homeAdvantagesBlock.querySelectorAll('.home_advantages_small-circle'),
            svgGradientCircles = homeAdvantagesBlock.querySelectorAll('.home_advantages_gradient-circle'),
            advantagesItems =  document.querySelectorAll('.home_advantages_item');

        resizeCalc();
        window.addEventListener('resize', resizeCalc);

        document.addEventListener("DOMContentLoaded", function () {
            Array.prototype.forEach.call(svgGradientCircles, function(svgGradientCircle, i) {
                var numberBlock = advantagesItems[i].querySelector('.number'),
                    targetNumber = +numberBlock.innerHTML.split(' ').join('');

                numberBlock.innerHTML = 0;

                var text = advantagesItems[i].querySelector('.home_advantages_item_out-of-round');

                N.checkView({
                    element: svgGradientCircle,
                    callback: function () {
                        svgGradientCircle.classList.add('active');
                        text.classList.add('active');

                        N.animate({
                            duration: 3000,
                            do: function (progress) {
                                numberBlock.innerHTML = Math.round(progress * targetNumber).toLocaleString();
                            },
                            timing: function (t) {
                                return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                            }
                        })
                    }
                });
            });
        });

        function resizeCalc () {
            var svgMainCircleSize = svgMainCircle.getBoundingClientRect();
            svgMask.style.height = svgMainCircleSize.height + 200 + 'px';

            // radius of small circle is 100px
            // radius of gradient circle is 85px
            // and stroke-width of gradient circle is 10px
            var svgSmallCircleSize = 100 / svgMask.clientWidth * 100,
                svgGradientCircleSize = 85 / svgMask.clientWidth * 100,
                svgGradientCircleStrokeSize = 10 / svgMask.clientWidth * 100;

            // for calc relative items coordinates
            var delta = (svgMask.clientWidth - svgMask.clientHeight) / 2;

            Array.prototype.forEach.call(svgSmallCircles, function (item, i) {
                item.style.r = svgSmallCircleSize;

                svgGradientCircles[i].style.r = svgGradientCircleSize;
                svgGradientCircles[i].style.strokeWidth = svgGradientCircleStrokeSize;

                advantagesItems[i].style.top = item.attributes.cy.value * svgMask.clientWidth / 100 - delta + 'px';
            });

            // for stroke animate
            var strokeLength = +svgGradientCircles[0].style.r * Math.PI * 2;

            Array.prototype.forEach.call(svgGradientCircles, function(svgGradientCircle) {
                svgGradientCircle.style.strokeDasharray = strokeLength;
                svgGradientCircle.style.strokeDashoffset = strokeLength;
            });
        }
    }
}();