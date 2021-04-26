import type { ComponentDescription, ComponentProperties } from '@playful/runtime';
import React, { useCallback, useEffect, useState } from 'react';
// @ts-ignore
import WarpSpeed from './WarpSpeed';

type WarpSpeedProperties = {
  speed: number;
  speedAdjustmentFactor: number;
  density: number;
  shape: 'circle' | 'square';
  warpEffect: boolean;
  warpEffectLength: number;
  depthFade: boolean;
  starSize: number;
  backgroundColor: string;
  color: string;
  pause: boolean;
  preset?: string;
} & ComponentProperties;

function WarpSpeedComponent(props: WarpSpeedProperties) {
  const {
    component,
    speed,
    speedAdjustmentFactor,
    density,
    shape,
    warpEffect,
    warpEffectLength,
    depthFade,
    starSize,
    backgroundColor,
    color,
    pause,
    preset,
  } = props;
  const [warpspeed, setWarpspeed] = useState<WarpSpeed>();
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();

  function createWarpSpeed(id: string) {
    if (warpspeed) {
      warpspeed.destroy();
    }
    const ws = new WarpSpeed(id, {
      speed,
      speedAdjFactor: speedAdjustmentFactor,
      density,
      shape,
      warpEffect,
      warpEffectLength,
      depthFade,
      starSize,
      backgroundColor,
      starColor: color,
    });
    if (pause) {
      ws.pause();
    }

    setWarpspeed(ws);
  }

  const canvasCallback = useCallback((canvas) => setCanvas(canvas), []);

  useEffect(() => {
    if (canvas) {
      createWarpSpeed(component!.id.toString());
    }
    return () => warpspeed?.destroy();
  }, [canvas, density]);

  /* TODO: good way to handle presets
  useEffect(() => {
    if (preset) {
      // Presets use default values when unspecified.
      const defaults: Properties = {};
      for (const property in WarpSpeedDescription.properties) {
        const defaultValue = WarpSpeedDescription.properties[property].default;
        if (defaultValue) {
          defaults[property] = defaultValue;
        }
      }
      const options = { ...defaults, ...JSON.parse(preset) };
      for (const prop in options) {
        component![prop] = options[prop];
      }
    }
  }, [preset]);
  */

  useEffect(() => {
    if (warpspeed) {
      warpspeed.TARGET_SPEED = speed;
      warpspeed.USE_CIRCLES = shape === 'circle';
      warpspeed.WARP_EFFECT = warpEffect;
      warpspeed.WARP_EFFECT_LENGTH = warpEffectLength;
      warpspeed.DEPTH_ALPHA = depthFade;
      warpspeed.STAR_SCALE = starSize;
      warpspeed.BACKGROUND_COLOR = backgroundColor;
      warpspeed.STAR_R = parseInt(color.slice(1, 3), 16);
      warpspeed.STAR_G = parseInt(color.slice(3, 5), 16);
      warpspeed.STAR_B = parseInt(color.slice(5, 7), 16);
    }
  }, [
    speed,
    speedAdjustmentFactor,
    density,
    shape,
    warpEffect,
    warpEffectLength,
    depthFade,
    starSize,
    backgroundColor,
    color,
  ]);

  useEffect(() => {
    if (!warpspeed) {
      return;
    }
    if (pause) {
      warpspeed.pause();
    } else {
      warpspeed.resume();
    }
  }, [pause]);

  return (
    <canvas
      style={{ width: '100%', height: '100%' }}
      id={component!.id.toString()}
      ref={canvasCallback}
    ></canvas>
  );
}

export const WarpSpeedDescription: ComponentDescription = {
  name: 'WarpSpeed',
  description: 'The WarpSpeed Component ...',
  author: 'Playful Software', // TODO: userId or unique username?
  icon: '...', // TODO: local file?
  preview: '...', // TODO: local file?
  collection: 'React Test Kit',
  renderer: WarpSpeedComponent,
  extends: 'Play Kit/View',
  properties: {
    /* TODO: good way to handle presets
    presets: {
      type: 'string',
      default: 'Custom',
      editor: {
        // TODO: how does custom work? Need new StringOrOption editor?
        type: 'Option',
        options: [
          { title: 'Custom', value: `{}` },
          { title: 'Default', value: `{}` },
          {
            title: 'Option 1',
            value: `{"density":2, "backgroundColor":"#FFFFFF", "starColor":"#000000", "speed":1.2}`,
          },
          {
            title: 'Option 2',
            value: `{"speed":25, "speedAdjFactor":0.03, "density":0.7, "shape":"square", "warpEffect":true, "warpEffectLength":5, "depthFade":false, "starSize":3, "backgroundColor":"#000000", "starColor":"#FFFFFF"}`,
          },
        ],
      },
    },
    */
    speed: {
      type: 'number',
      default: 0.7,
      editor: { type: 'Number', min: 0, max: 50, step: 0.1 },
      description: `The speed at which we're moving through the starfield.`,
    },
    warpEffect: {
      type: 'boolean',
      default: true,
      description: `Draws lines instead of just the stars. Slower.`,
    },
    warpEffectLength: {
      type: 'number',
      default: 5,
      editor: { type: 'Number', min: 0, max: 30, step: 0.1 },
      description: `How long the warp strikes are in depth units.`,
    },
    density: {
      type: 'number',
      default: 0.7,
      editor: { type: 'Number', min: 0, max: 30, step: 0.01 },
      description: `Star density. Number of stars = density * drawDistance.`,
    },
    depthFade: {
      type: 'boolean',
      default: true,
      description: `Stars that are further from the camera are less opaque. Slower.`,
    },
    starSize: {
      type: 'number',
      default: 3,
      editor: { type: 'Number', min: 1, max: 20 },
      description: `Size of stars.`,
    },
    shape: {
      type: 'string',
      default: 'circle',
      editor: { type: 'Option', options: ['circle', 'square'] },
      description: `Drawing squares instead of circles is faster, but looks less pretty.`,
    },
    speedAdjustmentFactor: {
      type: 'number',
      default: 0.03,
      editor: { type: 'Number', min: 0, max: 1, step: 0.01 },
      description: `How fast the speed changes from the current speed to target speed. 0 = no change, 1 = instant change.`,
    },
    backgroundColor: {
      type: 'string',
      default: 'hsl(263,45%,7%)',
      editor: 'Color',
      description: `Background color. Alpha not recommended.`,
    },
    color: {
      type: 'string',
      title: 'Star Color',
      default: '#ffffff',
      editor: 'Color',
      description: `Star color. Alpha not recommended.`,
    },
    pause: { type: 'boolean', default: false },
    credits: {
      type: 'string',
      default: `WarpSpeed.js by Federico Dossena (https://github.com/adolfintel/warpspeed)`,
      readonly: true,
    },

    // Override default width, height.
    width: { type: 'number', title: 'Width', default: 400 },
    height: { type: 'number', title: 'Height', default: 400 },
  },
};
