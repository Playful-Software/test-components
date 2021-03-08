import { CanvasDescription } from './canvas.js';
import { DweetDescription } from './dweet.js';

// TODO: remove requirement to export these since they're listed in the kit?
export { CanvasDescription, DweetDescription };

// TODO: export const KitDescription?
export const kit = {
  title: 'Test Kit',
  description: 'Test Kit contains test components',
  author: 'Playful Software',
  components: [DweetDescription, CanvasDescription],
};
