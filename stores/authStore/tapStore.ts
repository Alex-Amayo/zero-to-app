import { create } from 'zustand';

type TapStore = {
  taps: number;
  setTaps: (taps: number) => void;
  resetTaps: () => void;
};

/**
 * Zustand store for managing tap state and error handling.
 * @param {Object} props - properties for the tap store
 * @param {number} pops.taps - The current number of taps.
 * @param {(taps: number) => void} props.setTaps - Function to set the number of taps.
 * @param {() => void} props.resetTaps - Function to reset the tap count.
 * @returns {TapStore} The Zustand store containing tap-related state and actions.
 */

export const useTapStore = create<TapStore>((set) => ({
  taps: 0,
  setTaps: (taps) => set({ taps }),
  resetTaps: () => set({ taps: 0 }),
}));
