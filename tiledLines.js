const TiledLinesPrototype = {
  update(changed) {
    super.update(changed);

    const random = mulberry32(this.seed);

    const context = this.context;
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();

    var size = Math.min(this.width, this.height);
    context.lineWidth = this.lineWidth;
    context.lineCap = 'square';

    var step = this.step;
    context.strokeStyle = this.color;

    function draw(x, y, width, height) {
      var leftToRight = random() >= 0.5;

      if (leftToRight) {
        context.moveTo(x, y);
        context.lineTo(x + width, y + height);
      } else {
        context.moveTo(x + width, y);
        context.lineTo(x, y + height);
      }
    }

    for (var x = 0; x < size; x += step) {
      for (var y = 0; y < size; y += step) {
        draw(x, y, step, step);
      }
    }

    context.stroke();
  },
};

export const TiledLinesDescription = {
  title: 'Tiled Lines',
  name: 'TiledLines',
  prototype: TiledLinesPrototype,
  extends: 'Test Kit/Canvas',
  properties: {
    color: { type: 'string', title: 'Color', default: '#04a893', editor: 'Color' },
    step: {
      type: 'number',
      title: 'Step',
      default: 20,
      editor: { type: 'Number', min: 4, max: 50 },
    },
    lineWidth: {
      type: 'number',
      title: 'Line Thickness',
      default: 2,
      editor: { type: 'Number', min: 1, max: 25, step: 1 },
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
