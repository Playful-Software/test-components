declare module 'WarpSpeed' {
  export type Options = {
    speed?: number;
    targetSpeed?: number;
    speedAdjFactor?: number;
    density?: number;
    shape?: 'circle' | 'square';
    warpEffect?: boolean;
    warpEffectLength?: number;
    depthFade?: boolean;
    starSize?: number;
    backgroundColor?: string;
    starColor?: string;
  };

  export class WarpSpeed {
    constructor(id: string, options?: Options);
    destroy(): void;
    pause(): void;
    resume(): void;

    readonly SPEED: number;
    TARGET_SPEED: number;
    SPEED_ADJ_FACTOR: number;
    readonly DENSITY: number;
    USE_CIRCLES: boolean;
    WARP_EFFECT: boolean;
    WARP_EFFECT_LENGTH: number;
    DEPTH_ALPHA: boolean;
    STAR_SCALE: number;
    BACKGROUND_COLOR: string;
    STAR_R: number;
    STAR_G: number;
    STAR_B: number;
    readonly LAST_RENDER: number;
  }
  export = WarpSpeed;
}
