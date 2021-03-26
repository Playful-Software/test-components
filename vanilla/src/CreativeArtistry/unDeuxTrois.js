const UnDeuxTroisPrototype = {
  update(changed) {
    super.update(changed);

    const random = mulberry32(this.seed);

    const context = this.context;
    context.clearRect(0, 0, this.width, this.height);
    context.strokeStyle = this.color;

    var size = Math.min(this.width, this.height);
    context.lineWidth = this.lineWidth;
    context.lineCap = 'round';

    var rotateMultiplier = this.rotateMultiplier;
    var step = this.step;
    var aThirdOfHeight = size / 3;

    function draw(x, y, width, height, positions) {
      context.save();
      context.translate(x + width / 2, y + height / 2);
      context.rotate(random() * rotateMultiplier);
      context.translate(-width / 2, -height / 2);

      for (var i = 0; i <= positions.length; i++) {
        context.beginPath();
        context.moveTo(positions[i] * width, 0);
        context.lineTo(positions[i] * width, height);
        context.stroke();
      }

      context.restore();
    }

    for (var y = step; y < size - step; y += step) {
      for (var x = step; x < size - step; x += step) {
        if (y < aThirdOfHeight) {
          draw(x, y, step, step, [0.5]);
        } else if (y < aThirdOfHeight * 2) {
          draw(x, y, step, step, [0.2, 0.8]);
        } else {
          draw(x, y, step, step, [0.1, 0.5, 0.9]);
        }
      }
    }
  },
};

export const UnDeuxTroisDescription = {
  title: 'Un Deux Trois',
  name: 'UnDeuxTrois',
  prototype: UnDeuxTroisPrototype,
  extends: 'Test Kit/Canvas',
  properties: {
    color: { type: 'string', title: 'Color', default: '#af0202', editor: 'Color' },
    step: {
      type: 'number',
      title: 'Step',
      default: 20,
      editor: { type: 'Number', min: 4, max: 30 },
    },
    rotateMultiplier: {
      type: 'number',
      title: 'Rotate Multiplier',
      default: 5,
      editor: { type: 'Number', min: 1, max: 10, step: 0.1 },
    },
    lineWidth: {
      type: 'number',
      title: 'Line Thickness',
      default: 4,
      editor: { type: 'Number', min: 1, max: 20, step: 1 },
    },
    seed: {
      type: 'number',
      title: 'Random Seed',
      default: 1,
      editor: { type: 'Number', min: 1, max: 10000, step: 1 },
    },
    credits: { type: 'string', default: 'https://generativeartistry.com/tutorials/' },
    width: { type: 'number', title: 'Width', default: 400 },
    height: { type: 'number', title: 'Height', default: 400 },
  },
};

// A seedable psuedo random number generator.
// Thanks https://stackoverflow.com/a/47593316/707320
function mulberry32(seed) {
  return function () {
    var t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
