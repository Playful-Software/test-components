// TODO: non-obvious stuff
// - lifecycle: mount, unmount
// - update model: triggers, changed, invalidate
// - Reactor methods and properties: invalidate, update
// - underscore (private) properties

//
// Dweet component
//

// TODO: React form. Can eliminate DweetPrototype?

const DweetPrototype = {
  _FPS: 60,
  _lastError: '',

  mount(container, insertBefore) {
    this._element = document.createElement('canvas');
    super.mount(container, insertBefore);

    this.reset();

    // Remember the default globals so that later we can remove any that
    // were created by the dweet
    this._browserGlobals = {};
    Object.keys(window).forEach((key) => {
      this._browserGlobals[key] = true;
    });
  },

  unmount() {
    super.unmount();
    this.play = false;
    this.removeBrowserGlobals();
  },

  update(changed) {
    super.update(changed);

    if (changed.dweet) {
      this.newCode(this.dweet);
    }

    if (changed.play) {
      if (this.play) {
        requestAnimationFrame(this.loop.bind(this));
      }
    }
  },

  reset() {
    this.removeBrowserGlobals();

    const c = this._element;
    c.width = 1920;
    c.height = 1080;
    this._c = c;
    this._x = c.getContext('2d');

    this.setupPolyfills(this._x);

    this._time = 0;
    this._frame = 0;
  },

  newCode(code) {
    try {
      // Using new Function(), if the code reassigns `u`, it will reassign the global, breaking the dweet
      //var u = new Function("t", instrument(code));
      // Using eval(), if the code reassigns `u`, it will reassign the local, leaving `window.u` working
      //let u = eval('function u(t) {\n'+instrument(code)+'\n}');
      this._u = new Function('t,c,x,S,C,T,R', instrument(code)).bind(this);
    } catch (e) {
      this._u = function () {
        throw e;
      };
      throw e;
    }
    this.displayError('');
    this.reset();
  },

  loop(frame_time) {
    if (this.play) {
      requestAnimationFrame(this.loop.bind(this));
      var epsilon = 1.5; // Acounts for different timestamp resolution and slight jitter
      if (frame_time < this._nextFrameMs - epsilon) {
        return; // Skip this cycle as we are animating too quickly.
      }
      this._nextFrameMs = Math.max(this._nextFrameMs + 1000 / this._FPS, frame_time);
    }
    this._time = this._frame / this._FPS;
    if ((this._time * this._FPS) | (0 == this._frame - 1)) {
      this._time += 0.000001;
    }
    this._frame++;

    const x = this._x;
    const c = this._c;
    const S = Math.sin;
    const C = Math.cos;
    const T = Math.tan;
    const R = function (r, g, b, a) {
      a = a === undefined ? 1 : a;
      return 'rgba(' + (r | 0) + ',' + (g | 0) + ',' + (b | 0) + ',' + a + ')';
    };

    try {
      if (
        window.navigator.userAgent.indexOf('Edge') > -1 &&
        (this._u + '').match(
          /c\s*\.\s*(width|height)\s*(=|\+=|-=|\*=|\/=|%=|\**=|<<=|>>=|>>>=|&=|\^=|\|=)/
        ) != null
      ) {
        x.beginPath();
        x.resetTransform();
        x.clearRect(0, 0, c.width, c.height);
      }
      this._u(this._time, c, x, S, C, T, R);

      this.displayError('');
    } catch (e) {
      this.displayError(e);
      throw e;
    }
  },

  displayError(e) {
    if (this._lastError != e) {
      this._lastError = e;
      /*
      parent.postMessage({
        'type': 'error',
        'error': ''+e,
        'location': window.location.href
      },'*');
      */
    }
  },

  setupPolyfills(x) {
    if (typeof x.resetTransform === 'undefined') {
      x.resetTransform = function () {
        this.setTransform(1, 0, 0, 1, 0, 0);
      };
    }

    if (typeof x.ellipse === 'undefined') {
      x.ellipse = function (x, y, rx, ry, rotation, startAngle, endAngle, antiClockwise) {
        this.save();
        this.translate(x, y);
        this.rotate(rotation);
        this.scale(rx, ry);
        this.arc(0, 0, 1, startAngle, endAngle, antiClockwise);
        this.restore();
      };
    }
  },

  removeBrowserGlobals() {
    if (this._browserGlobals) {
      Object.keys(window).forEach((key) => {
        if (!this._browserGlobals[key]) {
          //console.log('Removing new global: ' + key);
          delete window[key];
        }
      });
    }
  },
};

// TODO: anything that can be removed? title?
export const DweetDescription = {
  title: 'Dweet',
  description: `
  dweet(t) is called 60 times per second.
  t: elapsed time in seconds.
  c: A 1920x1080 canvas.
  x: A 2D context for that canvas.
  S: Math.sin
  C: Math.cos
  T: Math.tan
  R: Generates rgba-strings, ex.: R(255, 255, 255, 0.5)
`,
  extends: 'Play Kit/View',
  prototype: DweetPrototype,
  properties: {
    // TODO: placeholder: { type: "String", default: "" }?
    link: { type: 'string', default: '' },
    dweet: {
      type: 'string',
      default:
        'c.width=2e3;t*=4;x.translate(980,540);for(i=0;i<32;)x.rotate(!i*C(t-=.03)+!(i++%4)*S(t)/9+1.57),x.fillRect(9*i,9*i,99,99)',
    },
    author: { type: 'string', default: '' },
    // TODO: allow type-inferred simple form ala pause: false?
    play: { type: 'boolean', default: true },
    title: { type: 'string', default: '' },
    backgroundColor: { type: 'string', default: '#ffffff', editor: 'Color' },
    width: { type: 'number', default: 568 },
    height: { type: 'number', default: 320 },
  },
};

// https://github.com/lionleaf/dwitter/blob/55e163a3b84e6734405f9823d249c5448b9d1089/dwitter/static/libs/loopbuster.js
function instrument(code) {
  return code;
}
