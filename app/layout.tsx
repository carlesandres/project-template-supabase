import 'app/globals.css';
import DesktopNav from 'components/DesktopNav';
import React from 'react';
import { QueryProvider } from 'providers/query-provider';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <div>
            <DesktopNav />
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
};

export default Layout;
