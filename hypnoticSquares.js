const HypnoticSquaresPrototype = {
  update(changed) {
    super.update(changed);

    const random = mulberry32(this.seed);

    const context = this.context;
    context.clearRect(0, 0, this.width, this.height);
    context.strokeStyle = this.color;

    var size = Math.min(this.width, this.height);
    context.lineWidth = this.lineWidth;

    var finalSize = this.finalSize;
    var startSteps;
    var offset = 11;
    var tileStep = (size - offset * 2) / 7;
    var startSize = tileStep;
    var directions = [-1, 0, 1];

    function draw(x, y, width, height, xMovement, yMovement, steps) {
      context.beginPath();
      context.rect(x, y, width, height);
      context.stroke();

      if (steps >= 0) {
        var newSize = startSize * (steps / startSteps) + finalSize;
        var newX = x + (width - newSize) / 2;
        var newY = y + (height - newSize) / 2;
        newX = newX - ((x - newX) / (steps + 2)) * xMovement;
        newY = newY - ((y - newY) / (steps + 2)) * yMovement;
        draw(newX, newY, newSize, newSize, xMovement, yMovement, steps - 1);
      }
    }

    for (var x = offset; x < size - offset; x += tileStep) {
      for (var y = offset; y < size - offset; y += tileStep) {
        startSteps = 2 + Math.ceil(random() * 3);
        var xDirection = directions[Math.floor(random() * directions.length)];
        var yDirection = directions[Math.floor(random() * directions.length)];
        draw(x, y, startSize, startSize, xDirection, yDirection, startSteps - 1);
      }
    }
  },
};

export const HypnoticSquaresDescription = {
  title: 'Hypnotic Squares',
  name: 'HypnoticSquares',
  prototype: HypnoticSquaresPrototype,
  extends: 'Test Kit/Canvas',
  properties: {
    color: { type: 'string', title: 'Color', default: '#b17902', editor: 'Color' },
    finalSize: {
      type: 'number',
      title: 'Final Size',
      default: 3,
      editor: { type: 'Number', min: 1, max: 50 },
    },
    lineWidth: {
      type: 'number',
      title: 'Line Thickness',
      default: 2,
      editor: { type: 'Number', min: 1, max: 50, step: 1 },
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
