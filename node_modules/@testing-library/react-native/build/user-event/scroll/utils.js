"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createScrollSteps = createScrollSteps;
exports.inertialInterpolator = inertialInterpolator;
exports.lerp = lerp;
exports.linearInterpolator = linearInterpolator;
const DEFAULT_STEPS_COUNT = 5;
function createScrollSteps(target, initialOffset, interpolator) {
  if (target.y != null) {
    return interpolator(target.y, initialOffset.y, DEFAULT_STEPS_COUNT).map(y => ({
      y,
      x: initialOffset.x
    }));
  }
  if (target.x != null) {
    return interpolator(target.x, initialOffset.x, DEFAULT_STEPS_COUNT).map(x => ({
      x,
      y: initialOffset.y
    }));
  }
  return [];
}

/**
 * Generate linear scroll values (with equal steps).
 */
function linearInterpolator(end, start, steps) {
  if (end === start) {
    return [end, start];
  }
  const result = [];
  for (let i = 0; i < steps; i += 1) {
    result.push(lerp(start, end, i / (steps - 1)));
  }
  return result;
}

/**
 * Generate inertial scroll values (exponentially slowing down).
 */
function inertialInterpolator(end, start, steps) {
  if (end === start) {
    return [end, start];
  }
  const result = [];
  let factor = 1;
  for (let i = 0; i < steps - 1; i += 1) {
    result.push(lerp(end, start, factor));
    factor /= 2;
  }
  result.push(end);
  return result;
}

/**
 * Linear interpolation function
 * @param v0 initial value (when t = 0)
 * @param v1 final value (when t = 1)
 * @param t interpolation factor form 0 to 1
 * @returns interpolated value between v0 and v1
 */
function lerp(v0, v1, t) {
  return v0 + t * (v1 - v0);
}
//# sourceMappingURL=utils.js.map