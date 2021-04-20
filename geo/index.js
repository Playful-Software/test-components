import { LocationDescription } from './location.js';

// TODO: remove requirement to export these since they're listed in the kit?
export {
  LocationDescription,
};

// TODO: export const KitDescription?
export const kit = {
  title: 'Geo Kit',
  description: 'Geo Kit',
  author: 'Playful Software',
  components: [
    LocationDescription,
  ],
};
