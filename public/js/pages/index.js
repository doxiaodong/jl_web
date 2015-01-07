window.addEventListener('load', init);

function init() {
    var html = $('html');
    var body = $('body');
    var isTouchScreen = function() {
        return 'ontouchstart' in document.documentElement;
    };
    var defaultEvent = isTouchScreen() ? {
        click: 'touchend',
    } : {
        click: 'click',
    };
    // header
    var headerNav = $('.header').find('.nav-list');
    var inner = $('li.each-block');
    var timeAfterActive;
    inner.each(function(index) {
        $(this).on(defaultEvent.click, function() {
            clearTimeout(timeAfterActive);
            if ($(this).hasClass('active')) {
                // collapsePage(inner);
            } else {
                expandPage(inner, $(this));

                sliderNav(index);
            }
        });
    });
    
    headerNav.find('.each-nav').each(function(index) {
        $(this).on(defaultEvent.click, function() {

            collapsePage(inner, true);
            expandPage(inner, inner.eq(index), true);
            sliderNav(index);
        });
    });

    // expand
    function expandPage(inner, obj, head) {
        inner.addClass('has-one-active');
        obj.addClass('active');
        obj.removeClass('has-one-active');
        
        timeAfterActive = setTimeout(function() {
            obj.addClass('after-active');
            if (!head) {
                $('header.header').addClass('active');
            }
        }, 500);
    }
    // collapse
    function collapsePage(inner, head) {
        if (!head) {
            $('header.header').removeClass('active');
        }
        $('li.each-block.active').removeClass('after-active active');
        inner.removeClass('has-one-active');
    }

    // slider nav
    function sliderNav(index) {
        var eachNav = headerNav.find('.each-nav');
        eachNav.each(function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
        });
        eachNav.eq(index).addClass('active');
        if (eachNav.eq(index).hasClass('active')) {
            var num = eachNav.length;
            headerNav.find('.slider-nav').css({
                left: 1/num*index*100+'%'
                // '-webkit-transform': '-webkit-translate3d(' + index * 100 + '%, 0, 0)',
                // '-moz-transform': '-moz-translate3d(' + index * 100 + '%, 0, 0)',
                // '-ms-transform': '-ms-translate3d(' + index * 100 + '%, 0, 0)',
                // '-o-transform': 'tran-o-slate3d(' + index * 100 + '%, 0, 0)',
                // 'transform': 'translate3d(' + index * 100 + '%, 0, 0)'
            });
        }
    }
}
