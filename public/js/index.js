window.addEventListener('load', init);

function init() {
    var isTouchScreen = function() {
        return 'ontouchstart' in document.documentElement;
    };
    var defaultEvent = isTouchScreen() ? {
        click: 'touchend',
    } : {
        click: 'click',
    };

    var inner = document.querySelectorAll('li.each-block');
    Array.prototype.forEach.call(inner, function(self) {
        var classNameTmp = self.className;
        self.addEventListener(defaultEvent.click, function() {
            if (document.querySelector('li.each-block.active')) {
                document.querySelector('li.each-block.active').className = classNameTmp;
                Array.prototype.forEach.call(inner, function(that) {
	            	that.className = classNameTmp;
	            });
            } else {
            	Array.prototype.forEach.call(inner, function(that) {
	            	that.className += ' has-one-active';
	            });
	            self.className = classNameTmp + ' active';
            }
        });
    });


}
