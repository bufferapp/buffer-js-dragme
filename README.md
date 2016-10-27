# @bufferapp/dragme

A super lightweight module for dragging elements using CSS3 Transforms. The goal of this module is to be a minimal way to make certain elements draggable on a page, i.e. modal windows.

This builds upon https://github.com/jwilsson 's  fork of our jQuery DragMe, and turns it into
a module.

## Install

```
npm install @bufferapp/dragme
```

## Usage

```js
const dragMe = new DragMe(document.querySelector('.draggable-component'), {cancel: 'textarea, .button'});
```
