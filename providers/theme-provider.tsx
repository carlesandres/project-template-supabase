'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect } from 'react';
import { useUIStore, type ThemePreference } from 'stores/ui-store';

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Theme provider that syncs next-themes with Zustand store.
 *
 * - next-themes handles system detection and CSS class switching
 * - Zustand stores the user's explicit preference (persisted)
 * - On mount, we sync Zustand preference to next-themes
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={theme}
      enableSystem
      disableTransitionOnChange
    >
      <ThemeSync theme={theme} setTheme={setTheme} />
      {children}
    </NextThemesProvider>
  );
}

/**
 * Inner component that syncs theme changes between next-themes and Zustand.
 * Must be inside NextThemesProvider to access useTheme hook.
 */
function ThemeSync({
  theme: zustandTheme,
  setTheme: setZustandTheme,
}: {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
}) {
  // We need to dynamically import useTheme to avoid SSR issues
  // next-themes provides useTheme which we can use inside the provider
  useEffect(() => {
    // On mount, the zustand theme is already set as defaultTheme
    // This effect handles syncing when theme changes from next-themes UI
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        const newTheme = e.newValue as ThemePreference;
        if (newTheme !== zustandTheme) {
          setZustandTheme(newTheme);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [zustandTheme, setZustandTheme]);

  return null;
}
