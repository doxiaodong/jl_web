window.onload = init;

function init() {
    var isTouchScreen = function() {
        return 'ontouchstart' in document.documentElement;
    };
    var defaultEvent = isTouchScreen() ? {
        mouseover: 'touchstart',
        mouseout: 'touchend'
    } : {
        mouseover: 'mouseover',
        mouseout: 'mouseout'
    };

    var inner = document.querySelectorAll('li.each-block');
    Array.prototype.forEach.call(inner, function(self) {
        var classNameTmp = self.className;
        self.addEventListener(defaultEvent.mouseover, function() {
            if (document.querySelector('li.each-block.active')) {
                document.querySelector('li.each-block.active').className = classNameTmp;
            }
            self.className += ' active';
        });
        self.addEventListener(defaultEvent.mouseout, function() {
            setTimeout(function() {
                self.className = classNameTmp;
            }, 300);
        });
    });


}
