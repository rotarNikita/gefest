+function() {
    //header mouse over menu
    var hoverLine = $('.hover_line');
    //передаём координаты для line
    var firstOffsetLeft = $('header .header_nav_wrapper li.active').offset().left;
    //передаём ширину для line
    var firstWidth = $('header .header_nav_wrapper li.active').outerWidth();
    hoverLine.css({left: firstOffsetLeft + 'px', maxWidth: firstWidth + 'px'});
    console.log(firstOffsetLeft);




    $('header .header_nav_wrapper li').mouseover(function(){
        var thisLi = $(this);
        var offsetLeft = thisLi.position().left;
        console.log(offsetLeft);
        var width = thisLi.outerWidth();
        hoverLine.css({left: offsetLeft + 'px', maxWidth: width + 'px'});
    });
}()