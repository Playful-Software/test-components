//
// Canvas component
//

// TODO: what does the React form of this look like?

export const CanvasPrototype = {
  prototype: "View",

  mount(container, insertBefore) {
    this.element = document.createElement("canvas");
    this.element.className = "view"; // TODO: how are these known?
    super.mount(container, insertBefore);

    this.context = this.element.getContext("2d");
  },

  update(dirty) {
    super.update(dirty);

    // Canvas has a display width "width" and a backing-store width "canvasWidth".
    // If canvasWidth is not set the display width is used as the backing-store width.
    if (dirty.width || dirty.canvasHeight) {
      const width = this.canvasWidth || this.width;
      // Be careful to only set the element.width if it has really changed because it clears the canvas.
      if (this.element.width !== width) {
        this.element.width = width;
      }
    }

    // Canvas has a display height "height" and a backing-store height "canvasHeight".
    // If canvasHeight is not set the display height is used as the backing-store height.
    if (dirty.height || dirty.canvasHeight) {
      const height = this.canvasHeight || this.height;
      // Be careful to only set the element.height if it has really changed because it clears the canvas.
      if (this.element.height !== height) {
        this.element.height = height;
      }
    }
  },

  toCanvas(context) {
    context.drawImage(this.context.canvas, 0, 0);
  },
};

export const CanvasDescription = {
  title: "Canvas",
  prototype: CanvasPrototype,
  // TODO: how to inherit all View properties?
  properties: {
    width: { type: "Number", default: 300 },
    height: { type: "Number", default: 150 },
  },
};
