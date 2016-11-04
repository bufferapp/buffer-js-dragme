var DragMe = function(el, options) {
  var defaults = {
    cancel: null
  };

  options = options || {};

  this.options = Object.assign(defaults, options);

  this.el = el;
  this.body = document.body;
  this.onMousedown = this.onMousedown.bind(this);
  this.onMove = this.onMove.bind(this);
  this.release = this.release.bind(this);

  this.el.classList.add('ui-draggable');
  this.el.addEventListener('mousedown', this.onMousedown);

  ['mozTransform', 'msTransform', 'oTransform', 'webkitTransform', 'transform'].forEach(function (property) {
    if (property in document.documentElement.style) {
      this.transform = property;
    }
  }, this);
}

DragMe.prototype.onMousedown = function(e) {
  var style;
  var coords;

  if (this.options.cancel && this.shouldCancel(e.target)) {
    return;
  }

  style = window.getComputedStyle(this.el)[this.transform];
  coords = style && style.match(/-*\d+/g);

  this.origX = coords ? parseInt(coords[4], 10) : 0;
  this.origY = coords ? parseInt(coords[5], 10) : 0;

  this.dragStartX = e.pageX;
  this.dragStartY = e.pageY;

  this.body.addEventListener('mousemove', this.onMove);
  this.body.addEventListener('mouseup', this.release);
  this.body.addEventListener('mouseleave', this.release);
};


DragMe.prototype.onMove = function(e) {
  var x = this.origX - this.dragStartX + e.pageX;
  var y = this.origY - this.dragStartY + e.pageY;
  this.el.classList.add('ui-dragging');

  this.el.style[this.transform] = 'translate(' + x + 'px,' + y + 'px)';
};


DragMe.prototype.release = function(e) {
  this.el.classList.remove('ui-dragging');
  this.body.removeEventListener('mousemove', this.onMove);
  this.body.removeEventListener('mouseup', this.release);
  this.body.removeEventListener('mouseleave', this.release);
};


DragMe.prototype.shouldCancel = function (target) {
  return target.closest(this.options.cancel);
};

module.exports = DragMe;
