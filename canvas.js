//
// Canvas component
//

// TODO: what does the React form of this look like?

export const CanvasPrototype = {
  mount(container, insertBefore) {
    this._element = document.createElement('canvas');
    super.mount(container, insertBefore);

    this.context = this._element.getContext('2d');
  },

  update(changed) {
    super.update(changed);
    const element = this._element;

    // Canvas has a display width "width" and a backing-store width "canvasWidth".
    // If canvasWidth is not set the display width is used as the backing-store width.
    if (changed.width || changed.canvasHeight) {
      const width = this.canvasWidth || this.width;
      // Be careful to only set the element.width if it has really changed because it clears the canvas.
      if (element.width !== width) {
        element.width = width;
      }
    }

    // Canvas has a display height "height" and a backing-store height "canvasHeight".
    // If canvasHeight is not set the display height is used as the backing-store height.
    if (changed.height || changed.canvasHeight) {
      const height = this.canvasHeight || this.height;
      // Be careful to only set the element.height if it has really changed because it clears the canvas.
      if (element.height !== height) {
        element.height = height;
      }
    }
  },

  toCanvas(context) {
    context.drawImage(this.context.canvas, 0, 0);
  },
};

export const CanvasDescription = {
  title: 'Canvas',
  prototype: CanvasPrototype,
  extends: 'Play Kit/View',
  properties: {
    width: { type: 'number', default: 300 },
    height: { type: 'number', default: 150 },
  },
};
