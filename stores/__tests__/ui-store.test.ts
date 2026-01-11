import { useUIStore } from 'stores/ui-store';

describe('useUIStore', () => {
  beforeEach(() => {
    useUIStore.getState().setCommandPaletteOpen(false);
  });

  it('defaults to command palette closed', () => {
    expect(useUIStore.getState().commandPalette.open).toBe(false);
  });

  it('setCommandPaletteOpen updates open state', () => {
    useUIStore.getState().setCommandPaletteOpen(true);
    expect(useUIStore.getState().commandPalette.open).toBe(true);

    useUIStore.getState().setCommandPaletteOpen(false);
    expect(useUIStore.getState().commandPalette.open).toBe(false);
  });

  it('openCommandPalette opens palette', () => {
    useUIStore.getState().openCommandPalette();
    expect(useUIStore.getState().commandPalette.open).toBe(true);
  });

  it('closeCommandPalette closes palette', () => {
    useUIStore.getState().openCommandPalette();
    useUIStore.getState().closeCommandPalette();
    expect(useUIStore.getState().commandPalette.open).toBe(false);
  });

  it('toggleCommandPalette toggles open state', () => {
    expect(useUIStore.getState().commandPalette.open).toBe(false);

    useUIStore.getState().toggleCommandPalette();
    expect(useUIStore.getState().commandPalette.open).toBe(true);

    useUIStore.getState().toggleCommandPalette();
    expect(useUIStore.getState().commandPalette.open).toBe(false);
  });
});
