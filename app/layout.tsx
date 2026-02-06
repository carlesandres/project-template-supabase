import 'app/globals.css';
import DesktopNav from 'components/DesktopNav';
import CommandPalette from 'components/CommandPalette';
import React from 'react';
import { QueryProvider } from 'providers/query-provider';
import { ThemeProvider } from 'providers/theme-provider';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <QueryProvider>
            <CommandPalette />
            <div>
              <DesktopNav />
              {children}
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
