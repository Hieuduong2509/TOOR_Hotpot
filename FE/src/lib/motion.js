/** @returns {boolean} */
export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** @param {number} [base=0.65] */
export function motionDuration(base = 0.65) {
  return prefersReducedMotion() ? 0.01 : base;
}
