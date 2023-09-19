import DesktopNav from 'components/DesktopNav';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <div>
      <DesktopNav />
      {children}
    </div>
  );
};

export default Layout;
