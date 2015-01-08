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
            
            if ($(this).hasClass('active')) {
                // collapsePage(inner);
            } else {
                clearTimeout(timeAfterActive);
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

    $('.back-index').on(defaultEvent.click, function() {
        collapsePage(inner);
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
        if (!$('header.header').hasClass('active')) {
            return;
        }
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
        body.attr('class', 'page-' + (index + 1));
    }


    // touches
    var touchObj = $('.pages');
    var changeWidth = 50;
    touchObj.each(function() {
        var touchObj = this;

        touchObj.addEventListener('gestureend', function(event) {
            if (event.scale < 1) {
                collapsePage(inner);
            }
        });
        var x = null, y = null;
        touchObj.addEventListener('touchstart', function(event) {
            if(event.touches.length == 1){
                var touch = event.touches[0];
                x = touch.pageX;
                y = touch.pageX;
            }
        });
        touchObj.addEventListener('touchmove', function(event) {
            if(event.touches.length == 1){
                var touch = event.touches[0];
                y = touch.pageX;
            }
        });
        touchObj.addEventListener('touchend', function(event) {
            if (x !== null) {
                if (y - x > changeWidth) {
                    console.log('haha')
                    swipePage('next');
                } else if (x - y > changeWidth) {
                    swipePage('prev');
                }
            }
            x = null;
            y = null;
        });

    });
    

    function swipePage(direction) {
        var num = headerNav.find('.each-nav').length;
        var curr = body.attr('class').slice(5)-1;
        var prev = curr - 1 >= 0 ? curr - 1 : num - 1;
        var next = curr + 1 <= num -1 ? curr + 1 : 0;
        if (direction === 'prev') {
            headerNav.find('.each-nav').eq(prev).trigger(defaultEvent.click);
        } else if (direction === 'next') {
            headerNav.find('.each-nav').eq(next).trigger(defaultEvent.click);
        }
    }
}