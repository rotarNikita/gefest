+function () {
    try {
        var homeAdvantagesBlock = document.querySelector('.home_advantages');

        if (homeAdvantagesBlock) {
            var svgMask = homeAdvantagesBlock.querySelector('.home_advantages_mask'),
                svgMainCircle = homeAdvantagesBlock.querySelector('.home_advantages_main-circle'),
                svgSmallCircles = homeAdvantagesBlock.querySelectorAll('.home_advantages_small-circle'),
                svgGradientCircles = homeAdvantagesBlock.querySelectorAll('.home_advantages_gradient-circle'),
                advantagesItems =  homeAdvantagesBlock.querySelectorAll('.home_advantages_item');

            var resizeCalcSmallMqOnlyOne = true;
            resize();
            window.addEventListener('resize', resize);

            document.addEventListener("DOMContentLoaded", function () {
                Array.prototype.forEach.call(svgGradientCircles, function(svgGradientCircle, i) {
                    var numberBlock = advantagesItems[i].querySelector('.number'),
                        targetNumber = +numberBlock.innerHTML.split(' ').join('');

                    var strokeLength = +svgGradientCircle.getAttribute('r') * Math.PI * 2;
                    svgGradientCircle.style.strokeDasharray = strokeLength;
                    svgGradientCircle.style.strokeDashoffset = strokeLength;

                    numberBlock.innerHTML = 0;

                    var text = advantagesItems[i].querySelector('.home_advantages_item_out-of-round');

                    N.checkView({
                        element: numberBlock,
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

            function resize () {
                var mediaQuery = window.matchMedia('(max-width: 992px)').matches;

                if (mediaQuery) {
                    if (resizeCalcSmallMqOnlyOne) {
                        resizeCalcSmallMqOnlyOne = false;
                        resizeCalcSmallMq();
                    }
                }
                else {
                    if (!resizeCalcSmallMqOnlyOne) {
                        Array.prototype.forEach.call(advantagesItems, function (advantagesItem) {
                            var text = advantagesItem.children[2],
                                br = advantagesItem.children[1];

                            br.remove();

                            if (advantagesItem.classList.contains('left')) {
                                text.remove();
                                advantagesItem.insertBefore(text, advantagesItem.children[0]);
                            }
                        })
                    }
                    resizeCalcBigMq();
                    resizeCalcSmallMqOnlyOne = true
                }
            }

            function resizeCalcSmallMq() {
                Array.prototype.forEach.call(advantagesItems, function (advantagesItem) {
                    var text = advantagesItem.querySelector('.home_advantages_item_out-of-round');

                    text.remove();
                    advantagesItem.appendChild(document.createElement('br'));
                    advantagesItem.appendChild(text);
                })
            }

            function resizeCalcBigMq () {
                var svgMainCircleSize = svgMainCircle.getBoundingClientRect(),
                    svgMaskClientHeight = svgMainCircleSize.height + 200;

                svgMask.style.height = svgMaskClientHeight + 'px';

                // radius of small circle is 100px
                var svgMaskClientWidth = svgMask.clientWidth || window.innerWidth;

                var svgSmallCircleSize = 100 / svgMaskClientWidth * 100;

                // for calc relative items coordinates
                var delta = (svgMaskClientWidth - svgMaskClientHeight) / 2;

                Array.prototype.forEach.call(svgSmallCircles, function (item, i) {
                    item.setAttribute('r', svgSmallCircleSize);

                    advantagesItems[i].style.top = item.attributes.cy.value * svgMaskClientWidth / 100 - delta + 'px';
                });
            }
        }
    } catch (e) {
        console.error(e)
    }
}();