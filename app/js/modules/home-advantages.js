+function () {
    var homeAdvantagesBlock = document.querySelector('.home_advantages');

    if (homeAdvantagesBlock) {
        var bigRound = homeAdvantagesBlock.querySelector('.home_advantages_round');

        bigRoundHeightCalc();
        window.addEventListener('resize', bigRoundHeightCalc);

        function bigRoundHeightCalc () {
            var width = bigRound.clientWidth;

            bigRound.style.height = width + 'px';
        }
    }
}();