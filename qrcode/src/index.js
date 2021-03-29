import { QRCodeDescription } from './qrcode.js';

// TODO: remove requirement to export these since they're listed in the kit?
export { QRCodeDescription };

// TODO: export const KitDescription?
export const kit = {
  title: 'QRCode',
  description: 'QRCode components',
  author: 'Playful Software',
  components: [QRCodeDescription],
};
