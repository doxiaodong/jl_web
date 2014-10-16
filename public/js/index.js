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
        self.addEventListener(defaultEvent.click, function() {
            if ($q('li.each-block.active')) {
                removeClass($q('li.each-block.active'), 'active');
                Array.prototype.forEach.call(inner, function(that) {
                    removeClass(that, 'has-one-active');
	            });
            } else {
            	Array.prototype.forEach.call(inner, function(that) {
                    addClass(that, 'has-one-active');
	            });
                removeClass(self, 'has-one-active');
                addClass(self, 'active');
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
