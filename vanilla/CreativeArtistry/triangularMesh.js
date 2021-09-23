const TriangularMeshPrototype = {
  update(changed) {
    super.update(changed);

    const random = mulberry32(this.seed);

    const context = this.context;
    context.clearRect(0, 0, this.width, this.height);

    var size = Math.min(this.width, this.height);
    context.lineWidth = this.lineWidth;
    context.lineJoin = 'bevel';

    const color = this.color;

    var line,
      dot,
      odd = false,
      lines = [],
      gap = size / this.gap;

    for (let y = gap / 2; y <= size; y += gap) {
      odd = !odd;
      line = [];
      for (var x = gap / 4; x <= size; x += gap) {
        dot = { x: x + (odd ? gap / 2 : 0), y: y };
        line.push({
          x: x + (random() * 0.8 - 0.4) * gap + (odd ? gap / 2 : 0),
          y: y + (random() * 0.8 - 0.4) * gap,
        });
        context.fill();
      }
      lines.push(line);
    }

    function drawTriangle(pointA, pointB, pointC) {
      context.beginPath();
      context.moveTo(pointA.x, pointA.y);
      context.lineTo(pointB.x, pointB.y);
      context.lineTo(pointC.x, pointC.y);
      context.lineTo(pointA.x, pointA.y);
      context.closePath();
      const cut = random();
      const r = Math.floor(parseInt(color.slice(1, 3), 16) * cut);
      const g = Math.floor(parseInt(color.slice(3, 5), 16) * cut);
      const b = Math.floor(parseInt(color.slice(5, 7), 16) * cut);
      context.fillStyle = `rgb(${r},${g},${b})`;
      context.fill();
      context.stroke();
    }

    var dotLine;
    odd = true;

    for (let y = 0; y < lines.length - 1; y++) {
      odd = !odd;
      dotLine = [];
      for (var i = 0; i < lines[y].length; i++) {
        dotLine.push(odd ? lines[y][i] : lines[y + 1][i]);
        dotLine.push(odd ? lines[y + 1][i] : lines[y][i]);
      }
      for (var i = 0; i < dotLine.length - 2; i++) {
        drawTriangle(dotLine[i], dotLine[i + 1], dotLine[i + 2]);
      }
    }
  },
};

export const TriangularMeshDescription = {
  name: 'TriangularMesh',
  prototype: TriangularMeshPrototype,
  extends: 'Test Kit/Canvas',
  _meta: {
    title: 'Triangular Mesh',
    properties: {
      color: { type: 'string', title: 'Color', default: '#ec91d8', editor: 'Color' },
      gap: {
        type: 'number',
        title: 'Gap',
        default: 8,
        editor: { type: 'Number', min: 1, max: 50 },
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
