import type { ComponentDescription } from '@playful/runtime';
import React from 'react';
import warpspeed from './ws.js';

type ThreeProperties = {};

function WarpSpeed(props: ThreeProperties) {
  return <canvas ref={(el) => new warpspeed(el)}></canvas>;
}

// TODO: credits
export const WarpSpeedDescription: ComponentDescription = {
  name: 'WarpSpeed',
  description: 'The WarpSpeed Component ...',
  author: 'Playful Software', // TODO: userId or unique username?
  icon: '...', // TODO: local file?
  preview: '...', // TODO: local file?
  collection: 'React Test Kit',
  renderer: WarpSpeed,
  extends: 'Play Kit/View',
  properties: {
    // Override default width, height.
    width: { type: 'number', title: 'Width', default: 400 },
    height: { type: 'number', title: 'Height', default: 400 },
  },
};
