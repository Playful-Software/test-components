import { CanvasDescription } from './canvas.js';
import { CirclePackingDescription } from './CreativeArtistry/circlepacking.js';
import { CubicDisarrayDescription } from './CreativeArtistry/cubicDisarray.js';
import { HypnoticSquaresDescription } from './CreativeArtistry/hypnoticSquares.js';
import { MondrianDescription } from './CreativeArtistry/mondrian.js';
import { RidgelineDescription } from './CreativeArtistry/ridgeline.js';
import { TiledLinesDescription } from './CreativeArtistry/tiledLines.js';
import { TriangularMeshDescription } from './CreativeArtistry/triangularMesh.js';
import { UnDeuxTroisDescription } from './CreativeArtistry/unDeuxTrois.js';
import { DweetDescription } from './dweet.js';
import { QRCodeDescription } from './QRCode/qrcode.js';

// TODO: remove requirement to export these since they're listed in the kit?
export {
  CanvasDescription,
  DweetDescription,
  QRCodeDescription,
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
    QRCodeDescription,
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
