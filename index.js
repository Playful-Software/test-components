import { CanvasDescription } from "./canvas.js";
import { DweetDescription } from "./dweet.js";

export { CanvasDescription, DweetDescription };

// TODO: export const KitDescription?
export const kit = {
  title: "Test Kit",
  description: "Test Kit contains test components",
  author: "Playful Software",
  components: [DweetDescription, CanvasDescription],
};
