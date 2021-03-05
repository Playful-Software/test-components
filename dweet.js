// TODO: non-obvious stuff
// - lifecycle: mount, unmount
// - update model: triggers, dirty, invalidate
// - Reactor methods and properties: invalidate, update
// - underscore (private) properties

//
// Dweet component
//

import { CanvasPrototype } from "./canvas.js";

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

  update(changed) {
    super.update(changed);

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
  title: "Dweet",
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
  extends: "Canvas",
  prototype: DweetPrototype,
  properties: {
    // TODO: placeholder: { type: "String", default: "" }?
    link: { type: "string", default: "" },
    dweet: { type: "string", default: "c.width=2e3;t*=4;x.translate(980,540);for(i=0;i<32;)x.rotate(!i*C(t-=.03)+!(i++%4)*S(t)/9+1.57),x.fillRect(9*i,9*i,99,99)" },
    author: { type: "string", default: "" },
    // TODO: allow type-inferred simple form ala pause: false?
    pause: { type: "boolean", default: false },
    title: { type: "string", default: "" },
    backgroundColor: { type: "string", default: "#ffffff", editor: "Color" },
    width: { type: "number", default: 568 },
    height: { type: "number", default: 320 },
    canvasWidth: { type: "number", default: 1920 },
    canvasHeight: { type: "number", default: 1080 },
  },
};
