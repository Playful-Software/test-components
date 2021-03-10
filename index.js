import { CanvasDescription } from './canvas.js';
import { DweetDescription } from './dweet.js';
import { CirclePackingDescription } from './circlepacking.js';
import { RidgelineDescription } from './ridgeline.js';
import { HypnoticSquaresDescription } from './hypnoticSquares.js';
import { MondrianDescription } from './mondrian.js';
import { TiledLinesDescription } from './tiledLines.js';
import { UnDeuxTroisDescription } from './unDeuxTrois.js';
import { CubicDisarrayDescription } from './cubicDisarray.js';
import { TriangularMeshDescription } from './triangularMesh.js';

// TODO: remove requirement to export these since they're listed in the kit?
export {
  CanvasDescription,
  DweetDescription,
  CirclePackingDescription,
  RidgelineDescription,
  HypnoticSquaresDescription,
  MondrianDescription,
  TiledLinesDescription,
  UnDeuxTroisDescription,
  CubicDisarrayDescription,
  TriangularMeshDescription,
};

// TODO: export const KitDescription?
export const kit = {
  title: 'Test Kit',
  description: 'Test Kit contains test components',
  author: 'Playful Software',
  components: [
    DweetDescription,
    CanvasDescription,
    CirclePackingDescription,
    RidgelineDescription,
    HypnoticSquaresDescription,
    MondrianDescription,
    TiledLinesDescription,
    UnDeuxTroisDescription,
    CubicDisarrayDescription,
    TriangularMeshDescription,
  ],
};
