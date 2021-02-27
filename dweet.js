// TODO: non-obvious stuff
// - lifecycle: mount, unmount
// - update model: triggers, dirty, invalidate
// - Reactor methods and properties: invalidate, update
// - underscore (private) properties

//
// Dweet component
//

import { CanvasPrototype } from "./canvas";

// TODO: React form. Can eliminate DweetPrototype?

const DweetPrototype = {
  u(t, c, x, S, C, T, R) {
    /*
    u(t) is called 60 times per second.
    t: elapsed time in seconds.
    c: A 1920x1080 canvas.
    x: A 2D context for that canvas.
    S: Math.sin
    C: Math.cos
    T: Math.tan
    R: Generates rgba-strings, ex.: R(255, 255, 255, 0.5)
    */
  },

  update(dirty) {
    super.update(dirty);

    // This makes sure t == 0 for the first update.
    const currentTime = Date.now();
    if (this._startTime === undefined) {
      this._startTime = currentTime;
    }

    // Elapsed time in seconds.
    const t = (currentTime - this._startTime) / 1000;

    function R(r, g, b, a) {
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    if (!this.pause) {
      // Force an update every frame. TODO: proper 60 FPS timing
      this.invalidate("_update_");

      let u = this.u.bind(this);
      if (this.dweet) {
        try {
          u = new Function("t,c,x,S,C,T,R", this.dweet).bind(this);
          delete this.$error;
        } catch (err) {
          this.$error = err.toString();
        }
      }
      u(t, this.element, this.context, Math.sin, Math.cos, Math.tan, R);
    }
  },

  mount(container, insertBefore) {
    super.mount(container, insertBefore);
    delete this._startTime; // May be left over from previous run.
  },
};

// TODO: ComponentDescription.inherit? extends? which inherits description.properties and .prototype
Reflect.setPrototypeOf(DweetPrototype, CanvasPrototype);

// TODO: anything that can be removed? title?
export const DweetDescription = {
  title: "Canvas",
  description: `
  u(t) is called 60 times per second.
  t: elapsed time in seconds.
  c: A 1920x1080 canvas.
  x: A 2D context for that canvas.
  S: Math.sin
  C: Math.cos
  T: Math.tan
  R: Generates rgba-strings, ex.: R(255, 255, 255, 0.5)
`,
  prototype: DweetPrototype,
  properties: {
    // TODO: placeholder?
    link: { type: "String", default: "" },
    // TODO: sample dweet?
    dweet: { type: "String", default: "" },
    author: { type: "String", default: "" },
    // TODO: allow type-inferred simple form ala pause: false?
    pause: { type: "Boolean", default: false },
    title: { type: "String", default: "" },
    backgroundColor: { type: "Color", default: "#ffffff" },
    width: { type: "Number", default: 568 },
    height: { type: "Number", default: 320 },
    canvasWidth: { type: "Number", default: 1920 },
    canvasHeight: { type: "Number", default: 1080 },
  },
};
