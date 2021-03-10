const MondrianPrototype = {
  update(changed) {
    super.update(changed);

    const random = mulberry32(this.seed);

    const context = this.context;
    context.clearRect(0, 0, this.width, this.height);

    var size = Math.min(this.width, this.height);
    context.lineWidth = this.lineWidth;
    var step = size / Math.max(1, this.step);
    var white = this.white;
    var colors = [this.color1, this.color2, this.color3];
    const colorCount = this.colors;

    var squares = [
      {
        x: 0,
        y: 0,
        width: size,
        height: size,
      },
    ];

    function splitSquaresWith(coordinates) {
      const { x, y } = coordinates;

      for (var i = squares.length - 1; i >= 0; i--) {
        const square = squares[i];

        if (x && x > square.x && x < square.x + square.width) {
          if (random() > 0.5) {
            squares.splice(i, 1);
            splitOnX(square, x);
          }
        }

        if (y && y > square.y && y < square.y + square.height) {
          if (random() > 0.5) {
            squares.splice(i, 1);
            splitOnY(square, y);
          }
        }
      }
    }

    function splitOnX(square, splitAt) {
      var squareA = {
        x: square.x,
        y: square.y,
        width: square.width - (square.width - splitAt + square.x),
        height: square.height,
      };

      var squareB = {
        x: splitAt,
        y: square.y,
        width: square.width - splitAt + square.x,
        height: square.height,
      };

      squares.push(squareA);
      squares.push(squareB);
    }

    function splitOnY(square, splitAt) {
      var squareA = {
        x: square.x,
        y: square.y,
        width: square.width,
        height: square.height - (square.height - splitAt + square.y),
      };

      var squareB = {
        x: square.x,
        y: splitAt,
        width: square.width,
        height: square.height - splitAt + square.y,
      };

      squares.push(squareA);
      squares.push(squareB);
    }

    for (var i = 0; i < size; i += step) {
      splitSquaresWith({ y: i });
      splitSquaresWith({ x: i });
    }

    function draw() {
      for (let i = 0; i < colorCount; i++) {
        squares[Math.floor(random() * squares.length)].color = colors[i % colors.length];
      }
      for (let i = 0; i < squares.length; i++) {
        context.beginPath();
        context.rect(squares[i].x, squares[i].y, squares[i].width, squares[i].height);
        if (squares[i].color) {
          context.fillStyle = squares[i].color;
        } else {
          context.fillStyle = white;
        }
        context.fill();
        context.stroke();
      }
    }

    draw();
  },
};

export const MondrianDescription = {
  title: 'Piet Mondrian',
  name: 'Mondrian',
  prototype: MondrianPrototype,
  extends: 'Test Kit/Canvas',
  properties: {
    color1: { type: 'string', title: 'Color 1', default: '#D40920', editor: 'Color' },
    color2: { type: 'string', title: 'Color 2', default: '#1356A2', editor: 'Color' },
    color3: { type: 'string', title: 'Color 3', default: '#00ff00', editor: 'Color' },
    white: { type: 'string', title: 'White', default: '#F2F5F1', editor: 'Color' },
    step: {
      type: 'number',
      title: 'Step',
      default: 7,
      editor: { type: 'Number', min: 1, max: 10 },
    },
    colors: {
      type: 'number',
      title: 'Color Count',
      default: 3,
      editor: { type: 'Number', min: 0, max: 10, step: 1 },
    },
    lineWidth: {
      type: 'number',
      title: 'Line Thickness',
      default: 6,
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
