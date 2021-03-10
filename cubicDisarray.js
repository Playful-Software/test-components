const CubicDisarrayPrototype = {
  update(changed) {
    super.update(changed);

    const random = mulberry32(this.seed);

    const context = this.context;
    context.clearRect(0, 0, this.width, this.height);
    context.strokeStyle = this.color;

    var size = Math.min(this.width, this.height);
    context.lineWidth = this.lineWidth;

    var randomDisplacement = this.displacement;
    var rotateMultiplier = this.rotateMultiplier;
    var offset = this.offset;
    var squareSize = this.squareSize;

    function draw(width, height) {
      context.beginPath();
      context.rect(-width / 2, -height / 2, width, height);
      context.stroke();
    }

    for (var i = squareSize; i <= size - squareSize; i += squareSize) {
      for (var j = squareSize; j <= size - squareSize; j += squareSize) {
        var plusOrMinus = random() < 0.5 ? -1 : 1;
        var rotateAmt = (((j / size) * Math.PI) / 180) * plusOrMinus * random() * rotateMultiplier;

        plusOrMinus = random() < 0.5 ? -1 : 1;
        var translateAmt = (j / size) * plusOrMinus * random() * randomDisplacement;

        context.save();
        context.translate(i + translateAmt + offset, j + offset);
        context.rotate(rotateAmt);
        draw(squareSize, squareSize);
        context.restore();
      }
    }
  },
};

export const CubicDisarrayDescription = {
  title: 'Cubic Disarray',
  name: 'CubicDisarray',
  prototype: CubicDisarrayPrototype,
  extends: 'Test Kit/Canvas',
  properties: {
    color: { type: 'string', title: 'Color', default: '#056905', editor: 'Color' },
    width: { type: 'number', title: 'Width', default: 400 },
    height: { type: 'number', title: 'Height', default: 400 },
    displacement: {
      type: 'number',
      title: 'Displacement',
      default: 15,
      editor: { type: 'Number', min: 1, max: 1000 },
    },
    rotateMultiplier: {
      type: 'number',
      title: 'Rotate Multiplier',
      default: 30,
      editor: { type: 'Number', min: 1, max: 500, step: 1 },
    },
    offset: {
      type: 'number',
      title: 'Offset',
      default: 10,
      editor: { type: 'Number', min: 1, max: 500, step: 1 },
    },
    squareSize: {
      type: 'number',
      title: 'Square Size',
      default: 30,
      editor: { type: 'Number', min: 4, max: 100, step: 1 },
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
