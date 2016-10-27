# @bufferapp/dragme

A super lightweight module for dragging elements using CSS3 Transforms. The goal of this module is to be a minimal module to make certain elements draggable on a page, i.e. modal windows.

## Install

```
npm install @bufferapp/dragme
```

## Usage

```js
const dragMe = new DragMe(document.querySelector('.draggable-component'), {cancel: 'textarea, .button'});
```
