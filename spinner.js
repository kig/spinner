Spinner = function(container, options) {
  options = options || {};
  this.element = this.create(options.x || '50%', options.y || '50%', options.color);

  if (options.showCurtain) this.curtain = this.createCurtain();

  this.removeSelf = this.removeSelfFunc(this.curtain);
  this.element.firstChild.addEventListener('webkitTransitionEnd', this.removeSelf, false);
  this.element.firstChild.addEventListener('msTransitionEnd', this.removeSelf, false);
  this.element.firstChild.addEventListener('oTransitionEnd', this.removeSelf, false);
  this.element.firstChild.addEventListener('transitionend', this.removeSelf, false);
  this.container = container;
  this.container.appendChild(this.element);
};


Spinner.prototype = {

  start : function() {
    var self = this;
    setTimeout(function() {
      self.show();
    }, 0);
  },

  show : function() {
    this.element.firstChild.className = 'spinner-bringIn';
    if (this.curtain) {
      var self = this;
      this.container.insertBefore(this.curtain, this.container.firstChild);
      this.curtain.style.opacity = 0;
      setTimeout(function() {
        self.curtain.style.opacity = 0.5;
      }, 0);
    }
  },

  hide : function() {
    this.element.firstChild.className = 'spinner-bringOut';
    if (this.curtain) this.curtain.style.opacity = 0;
  },

  create : function(x, y, color) {
    var spinner = document.createElement('div');
    spinner.className = 'spinner-bringOut';
    spinner.style.position = 'absolute';
    spinner.style.marginLeft = '-25px';
    spinner.style.marginTop = '-25px';
    spinner.style.left = x;
    spinner.style.top = y;
    var canvas = document.createElement('canvas');
    canvas.className = 'spinner';
    canvas.width = canvas.height = 50;
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 4;
    if (color != null)
      ctx.strokeStyle = color;
    var third = Math.PI*2 / 3;
    for (var i=0; i<3; i++) {
      ctx.beginPath();
      ctx.arc(25, 25, 20, i*third, i*third+Math.PI/2, false);
      ctx.stroke();
    }
    spinner.appendChild(canvas);
    var elem = document.createElement('div');
    elem.className = 'spinner-container';
    elem.appendChild(spinner);
    return elem;
  },

  createCurtain : function() {
    var curtain = document.createElement('div');
    curtain.className = 'spinner-curtain';
    return curtain;
  },

  removeSelfFunc : function(curtain) {
    var self = this;
    return function(ev) {
      if (ev.target != this || ev.propertyName != 'opacity') {
        return;
      }
      if (this.parentNode && this.className == 'spinner-bringOut') {
        if (self.onhide) self.onhide();
        if (curtain) curtain.parentNode.removeChild(curtain);
      } else if (this.className == 'spinner-bringIn') {
        if (self.onshow) self.onshow();
      }
    };
  }

};
