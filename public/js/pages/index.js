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


    $.pjax({
        selector: 'a',
        container: '.page1 .pages .view-center',
        show: 'fade',
        cache: true,
        storage: true,
        titleSuffix: '',
        filter: function(){},
        callback: function(){}
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


    $.fn.extend({
        swipe: function(direction, callback) {
            if (this === []) {
                return this;
            }
            this.each(function() {
                var touchObj = this;
                var x1 = null,
                    x2 = null,
                    y1 = null,
                    y2 = null;
                var changeWidth = 50, changeHeight = 50;
                touchObj.addEventListener('touchstart', function(event) {
                    if (event.touches.length == 1) {
                        var touch = event.touches[0];
                        x1 = touch.pageX;
                        x2 = touch.pageX;
                        y1 = touch.pageY;
                        y2 = touch.pageY;
                    }
                });
                touchObj.addEventListener('touchmove', function(event) {
                    if (event.touches.length == 1) {
                        var touch = event.touches[0];
                        x2 = touch.pageX;
                        y2 = touch.pageY;
                    }
                });
                touchObj.addEventListener('touchend', function(event) {
                    // left and right
                    if (x1 !== null && Math.abs(y2 - y1) < changeHeight ) {
                        if (x2 - x1 > changeWidth) {
                            if (direction === undefined) {
                                $(touchObj).trigger('swipeRight');
                            }
                            if (direction === 'right') {
                                callback();
                            }

                        } else if (x1 - x2 > changeWidth) {
                            if (direction === undefined) {
                                $(touchObj).trigger('swipeLeft');
                            }
                            if (direction === 'left') {
                                callback();
                            }
                        }
                    }
                    // top and bottom
                    if (x1 !== null && Math.abs(x2 - x1) < changeWidth ) {
                        if (y2 - y1 > changeHeight) {
                            if (direction === undefined) {
                                $(touchObj).trigger('swipeTop');
                            }
                            if (direction === 'top') {
                                callback();
                            }

                        } else if (y1 - y2 > changeHeight) {
                            if (direction === undefined) {
                                $(touchObj).trigger('swipeBottom');
                            }
                            if (direction === 'bottom') {
                                callback();
                            }
                        }
                    }
                    x1 = null;
                    x2 = null;
                    y1 = null;
                    y2 = null;
                });
            });
            return this;
        }
    });
    
    /*way 1*/
    $('.pages').swipe().on({
        swipeLeft: function() {
            swipePage('next');
        }, swipeRight: function() {
            swipePage('prev');
        }
    });
    /*way 2*/
    /*$('.pages').swipe('left', function(){
        swipePage('next');
    }).swipe('right', function() {
        swipePage('prev');
    });*/
    $('.pages').each(function() {
        this.addEventListener('gestureend', function(event) {
            if (event.scale < 1) {
                collapsePage(inner);
            }
        });
    });
    
    function swipePage(direction) {
        var num = headerNav.find('.each-nav').length;
        var curr = body.attr('class').slice(5) - 1;
        var prev = curr - 1 >= 0 ? curr - 1 : num - 1;
        var next = curr + 1 <= num - 1 ? curr + 1 : 0;
        if (direction === 'prev') {
            headerNav.find('.each-nav').eq(prev).trigger(defaultEvent.click);
        } else if (direction === 'next') {
            headerNav.find('.each-nav').eq(next).trigger(defaultEvent.click);
        }
    }
}







