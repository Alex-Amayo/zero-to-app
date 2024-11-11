import { Point } from '../../types';
type InterpolatorFn = (end: number, start: number, steps: number) => number[];
export declare function createScrollSteps(target: Partial<Point>, initialOffset: Point, interpolator: InterpolatorFn): Point[];
/**
 * Generate linear scroll values (with equal steps).
 */
export declare function linearInterpolator(end: number, start: number, steps: number): number[];
/**
 * Generate inertial scroll values (exponentially slowing down).
 */
export declare function inertialInterpolator(end: number, start: number, steps: number): number[];
/**
 * Linear interpolation function
 * @param v0 initial value (when t = 0)
 * @param v1 final value (when t = 1)
 * @param t interpolation factor form 0 to 1
 * @returns interpolated value between v0 and v1
 */
export declare function lerp(v0: number, v1: number, t: number): number;
export {};
