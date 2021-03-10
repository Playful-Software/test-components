const CirclePackingPrototype = {
  update(changed) {
    super.update(changed);

    const context = this.context;
    context.clearRect(0, 0, this.width, this.height);
    context.strokeStyle = this.color;
    const size = Math.min(this.width, this.height);

    context.lineWidth = this.lineWidth;

    var circles = [];
    var minRadius = this.minRadius;
    var maxRadius = this.maxRadius;
    var totalCircles = this.totalCircles;
    var createCircleAttempts = this.totalCircles;

    const random = mulberry32(this.seed);

    function createAndDrawCircle() {
      var newCircle;
      var circleSafeToDraw = false;
      for (var tries = 0; tries < createCircleAttempts; tries++) {
        newCircle = {
          x: Math.floor(random() * size),
          y: Math.floor(random() * size),
          radius: minRadius,
        };

        if (doesCircleHaveACollision(newCircle)) {
          continue;
        } else {
          circleSafeToDraw = true;
          break;
        }
      }

      if (!circleSafeToDraw) {
        return;
      }

      for (var radiusSize = minRadius; radiusSize < maxRadius; radiusSize++) {
        newCircle.radius = radiusSize;
        if (doesCircleHaveACollision(newCircle)) {
          newCircle.radius--;
          break;
        }
      }

      circles.push(newCircle);
      context.beginPath();
      context.arc(newCircle.x, newCircle.y, newCircle.radius, 0, 2 * Math.PI);
      context.stroke();
    }

    function doesCircleHaveACollision(circle) {
      for (var i = 0; i < circles.length; i++) {
        var otherCircle = circles[i];
        var a = circle.radius + otherCircle.radius;
        var x = circle.x - otherCircle.x;
        var y = circle.y - otherCircle.y;

        if (a >= Math.sqrt(x * x + y * y)) {
          return true;
        }
      }

      if (circle.x + circle.radius >= size || circle.x - circle.radius <= 0) {
        return true;
      }

      if (circle.y + circle.radius >= size || circle.y - circle.radius <= 0) {
        return true;
      }

      return false;
    }

    for (var i = 0; i < totalCircles; i++) {
      createAndDrawCircle();
    }
  },
};

export const CirclePackingDescription = {
  title: 'Circle Packing',
  name: 'CirclePacking',
  prototype: CirclePackingPrototype,
  extends: 'Test Kit/Canvas',
  properties: {
    color: { type: 'string', title: 'Color', default: '#ff0000', editor: 'Color' },
    width: { type: 'number', title: 'Width', default: 400 },
    height: { type: 'number', title: 'Height', default: 400 },
    totalCircles: {
      type: 'number',
      title: 'Total Circles',
      default: 500,
      editor: { type: 'Number', min: 1, max: 1000 },
    },
    lineWidth: {
      type: 'number',
      title: 'Line Thickness',
      default: 2,
      editor: { type: 'Number', min: 1, max: 50, step: 1 },
    },
    minRadius: {
      type: 'number',
      title: 'Min Radius',
      default: 1,
      editor: { type: 'Number', min: 1, max: 200, step: 1 },
    },
    maxRadius: {
      type: 'number',
      title: 'Max Radius',
      default: 100,
      editor: { type: 'Number', min: 1, max: 100, step: 1 },
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
