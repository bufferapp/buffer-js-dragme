/**
 * Small utility to drag elements around.
 *
 * @param {string} el - the element to make draggable
 * @param {object} options
 * @param {string} options.cancel - CSS selector that matches some children of el
 *        on which to prevent dragging
 * @param {function} options.onDragStart - gets passed the target element as first argument
 * @param {function} options.onDragEnd
 */

class DragMe {
  constructor(el, options) {
    const defaults = {
      cancel: null,
      onDragStart: null,
      onDragEnd: null,
    };

    options = options || {};

    this.options = Object.assign(defaults, options);

    this.el = el;
    this.body = document.body;

    this.setup();

    ['mozTransform', 'msTransform', 'oTransform', 'webkitTransform', 'transform'].forEach((prop) => {
      if (prop in document.documentElement.style) {
        this.transform = prop;
      }
    });
  }

  shouldCancel(target) {
    return target.closest(this.options.cancel);
  }

  setup() {
    this.el.classList.add('ui-draggable');
    this.el.addEventListener('mousedown', this.onMousedown);
  }

  cleanup() {
    this.el.classList.remove('ui-draggable');
    this.el.removeEventListener('mousedown', this.onMousedown);
  }

  onMousedown = (e) => {
    if (this.options.cancel && this.shouldCancel(e.target)) {
      return;
    }

    const style = window.getComputedStyle(this.el)[this.transform];
    const coords = style && style.match(/-*\d+/g);

    this.origX = coords ? parseInt(coords[4], 10) : 0;
    this.origY = coords ? parseInt(coords[5], 10) : 0;

    this.dragStartX = e.pageX;
    this.dragStartY = e.pageY;

    this.body.addEventListener('mousemove', this.onMove);
    this.body.addEventListener('mouseup', this.release);
    this.body.addEventListener('mouseleave', this.release);

    if (this.options.onDragStart) this.didExecuteOnDragStart = false;
  };

  onMove = (e) => {
    const x = this.origX - this.dragStartX + e.pageX;
    const y = this.origY - this.dragStartY + e.pageY;

    this.el.classList.add('ui-dragging');
    this.el.style[this.transform] = `translate(${x}px, ${y}px)`;

    if (this.options.onDragStart && !this.didExecuteOnDragStart) {
      this.options.onDragStart(e.target);
      this.didExecuteOnDragStart = true;
    }
  };

  release = () => {
    this.el.classList.remove('ui-dragging');

    this.body.removeEventListener('mousemove', this.onMove);
    this.body.removeEventListener('mouseup', this.release);
    this.body.removeEventListener('mouseleave', this.release);

    if (this.options.onDragEnd && this.didExecuteOnDragStart) this.options.onDragEnd();
  };
}

export default DragMe;
