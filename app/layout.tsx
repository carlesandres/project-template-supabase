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
    <QueryProvider>
      <div>
        <DesktopNav />
        {children}
      </div>
    </QueryProvider>
  );
};

export default Layout;
