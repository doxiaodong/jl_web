window.addEventListener('load', init);

function init() {
    var $id = function(id){
        return document.getElementById(id);
    };
    var $q = function(q){
        return document.querySelector(q);
    };
    var $qa = function(qa){
        return document.querySelectorAll(qa);
    };
    var isTouchScreen = function() {
        return 'ontouchstart' in document.documentElement;
    };
    var defaultEvent = isTouchScreen() ? {
        click: 'touchend',
    } : {
        click: 'click',
    };

    var inner = $qa('li.each-block');
    Array.prototype.forEach.call(inner, function(self) {
        var timeAfterActive;
        self.addEventListener(defaultEvent.click, function() {
            clearTimeout(timeAfterActive);
            if ($q('li.each-block.active')) {
                $q('header.header').classList.remove('active');
                $q('li.each-block.active').classList.remove('after-active', 'active');
                Array.prototype.forEach.call(inner, function(that) {
                    that.classList.remove('has-one-active');
	            });
            } else {
            	Array.prototype.forEach.call(inner, function(that) {
                    that.classList.add('has-one-active');
	            });
                self.classList.remove('has-one-active');
                self.classList.add('active');
                timeAfterActive = setTimeout(function() {
                    self.classList.add('after-active');
                    $q('header.header').classList.add('active');
                }, 500);
            }
        });
    });

    // has/add/remove class
    function hasClass(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    function addClass(obj, cls) {
        if (!hasClass(obj, cls)) obj.className += ' ' + cls;
    }

    function removeClass(obj, cls) {
        if (hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, '');
        }
    }

}
