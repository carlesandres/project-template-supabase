import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import 'test/mocks/next';
import { pushMock } from 'test/mocks/next';
import CommandPalette from 'components/CommandPalette';
import { useUIStore } from 'stores/ui-store';

beforeEach(() => {
  pushMock.mockClear();
  useUIStore.getState().setCommandPaletteOpen(false);
});

describe('CommandPalette', () => {
  it('is closed by default', () => {
    render(<CommandPalette />);
    expect(
      screen.queryByPlaceholderText('Type a command or search...'),
    ).not.toBeInTheDocument();
  });

  it('opens when store is set to open', async () => {
    render(<CommandPalette />);

    useUIStore.getState().openCommandPalette();

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Type a command or search...'),
      ).toBeInTheDocument();
    });
  });

  it('toggles open on Cmd/Ctrl+K', async () => {
    render(<CommandPalette />);

    fireEvent.keyDown(window, { key: 'k', metaKey: true });

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Type a command or search...'),
      ).toBeInTheDocument();
    });

    fireEvent.keyDown(window, { key: 'k', metaKey: true });

    await waitFor(() => {
      expect(
        screen.queryByPlaceholderText('Type a command or search...'),
      ).not.toBeInTheDocument();
    });
  });

  it('navigates when selecting an item', async () => {
    render(<CommandPalette />);
    useUIStore.getState().openCommandPalette();

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Type a command or search...'),
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Go to Stats'));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/stats');
    });

    await waitFor(() => {
      expect(
        screen.queryByPlaceholderText('Type a command or search...'),
      ).not.toBeInTheDocument();
    });
  });
});
