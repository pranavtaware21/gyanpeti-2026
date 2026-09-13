/**
 * Haptics, where the platform allows it.
 *
 * iOS Safari ignores navigator.vibrate entirely, so every haptic call is
 * paired with a visual pulse elsewhere in the UI. Nothing depends on it.
 */
const can = () => typeof navigator !== 'undefined' && 'vibrate' in navigator

export const haptic = {
  tap: () => { if (can()) navigator.vibrate(8) },
  reveal: () => { if (can()) navigator.vibrate([0, 14, 40, 22]) },
  arrive: () => { if (can()) navigator.vibrate([0, 30, 60, 30, 60, 70]) },
}
