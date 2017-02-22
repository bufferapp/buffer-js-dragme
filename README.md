# @bufferapp/dragme

[![NPM Version](https://img.shields.io/npm/v/@bufferapp/dragme.svg)](https://www.npmjs.com/package/@bufferapp/dragme)

A super lightweight module for dragging elements using CSS3 Transforms. The goal of this module is to be a minimal way to make certain elements draggable on a page, i.e. modal windows.

Dragme makes use of some modern JS APIs – make sure to polyfill it depending on the browser support wanted:

- `Element.classList`
- `Object.assign()`
- `Element.closest()`

## Install

```
npm install @bufferapp/dragme
```

## Usage

```js
const dragMe = new DragMe(document.querySelector('#draggable-component'));
```

Prevent dragging on certain elements:

```js
const dragMe = new DragMe(document.querySelector('#draggable-component'), {
  cancel: 'textarea, .button',
});
```

Cleanup bindings to disable a DragMe instance:

```js
dragMe.cleanup();
```

Listen to when dragging starts and stops using callbacks:

```js
const dragMe = new DragMe(document.querySelector('#draggable-component'), {
  onDragStart: () => console.log('Started dragging'),
  onDragEnd: () => console.log('Stopped dragging'),
});
```


## Roadmap

- [ ] Use requestAnimationFrame for smoother movement

## Contributing

Bug fixes or improvements welcome!

## Credits

This builds upon [jwilsson](https://github.com/jwilsson)'s non-jQuery fork of Buffer's [jQuery DragMe](https://github.com/bufferapp/jquery-dragme).
