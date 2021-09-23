const RidgelinePrototype = {
  update(changed) {
    super.update(changed);

    const random = mulberry32(this.seed);

    const context = this.context;
    context.clearRect(0, 0, this.width, this.height);
    context.strokeStyle = this.color;

    var size = Math.min(this.width, this.height);
    context.lineWidth = this.lineWidth;

    var baseline = this.baseline;
    var step = this.step;
    var lines = [];

    // Create the lines
    for (let i = step; i <= size - step; i += step) {
      var line = [];
      for (let j = step; j <= size - step; j += step) {
        var distanceToCenter = Math.abs(j - size / 2);
        var variance = Math.max(size / 2 - baseline - distanceToCenter, 0);
        var randomNumber = ((random() * variance) / 2) * -1;
        var point = { x: j, y: i + randomNumber };
        line.push(point);
      }
      lines.push(line);
    }

    // Do the drawing
    for (let i = this.start; i < lines.length; i++) {
      context.beginPath();
      context.moveTo(lines[i][0].x, lines[i][0].y);

      for (var j = 0; j < lines[i].length - 2; j++) {
        var xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
        var yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
        context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
      }

      context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, lines[i][j + 1].x, lines[i][j + 1].y);
      context.save();
      context.globalCompositeOperation = 'destination-out';
      context.fill();
      context.restore();
      context.stroke();
    }
  },
};

export const RidgelineDescription = {
  name: 'Ridgeline',
  prototype: RidgelinePrototype,
  extends: 'Test Kit/Canvas',
  _meta: {
    properties: {
      color: { type: 'string', title: 'Color', default: '#0000c0', editor: 'Color' },
      step: {
        type: 'number',
        title: 'Step',
        default: 10,
        editor: { type: 'Number', min: 2, max: 57 },
      },
      start: {
        type: 'number',
        title: 'Start',
        default: 5,
        editor: { type: 'Number', min: 0, max: 40, step: 1 },
      },
      baseline: {
        type: 'number',
        title: 'Baseline',
        default: 50,
        editor: { type: 'Number', min: 1, max: 200, step: 1 },
      },
      lineWidth: {
        type: 'number',
        title: 'Line Thickness',
        default: 2,
        editor: { type: 'Number', min: 1, max: 15, step: 1 },
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
