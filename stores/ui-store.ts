import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type UIState = {
  commandPalette: {
    open: boolean;
  };
};

export type UIActions = {
  setCommandPaletteOpen: (open: boolean) => void;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
};

export type UIStore = UIState & UIActions;

const initialState: UIState = {
  commandPalette: {
    open: false,
  },
};

export const useUIStore = create<UIStore>()(
  immer((set) => ({
    ...initialState,
    setCommandPaletteOpen: (open) =>
      set((state) => {
        state.commandPalette.open = open;
      }),
    openCommandPalette: () =>
      set((state) => {
        state.commandPalette.open = true;
      }),
    closeCommandPalette: () =>
      set((state) => {
        state.commandPalette.open = false;
      }),
    toggleCommandPalette: () =>
      set((state) => {
        state.commandPalette.open = !state.commandPalette.open;
      }),
  })),
);
