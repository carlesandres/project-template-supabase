import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import 'test/mocks/next';
import DesktopNav from 'components/DesktopNav';
import { useUIStore } from 'stores/ui-store';

describe('DesktopNav', () => {
  beforeEach(() => {
    useUIStore.getState().setCommandPaletteOpen(false);
  });

  it('opens the command palette when clicking the button', () => {
    render(<DesktopNav />);

    const button = screen.getByRole('button', { name: /command/i });
    fireEvent.click(button);

    expect(useUIStore.getState().commandPalette.open).toBe(true);
  });

  it('shows the Mac modifier key label when on macOS', () => {
    Object.defineProperty(window.navigator, 'platform', {
      value: 'MacIntel',
      configurable: true,
    });

    render(<DesktopNav />);

    expect(screen.getByText('⌘')).toBeInTheDocument();
    expect(screen.getByText('K')).toBeInTheDocument();
  });
});
