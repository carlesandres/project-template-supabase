'use client';

import React from 'react';
import NavigationLink from 'components/NavigationLink';
// import UserAvatar from 'components/UserAvatar';
import { AlignJustify, Activity, Search } from 'lucide-react';
import { Button } from 'components/ui/button';
import { useUIStore } from 'stores/ui-store';
import FeedbackButton from './FeedbackButton';
import { ThemeToggle } from './ThemeToggle';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
// import { Database } from 'types/supabase';

const navigation = [
  { name: 'Learn', href: '/', icon: <AlignJustify size={16} /> },
  { name: 'Stats', href: '/stats', icon: <Activity size={16} /> },
  { name: 'Search', href: '/search', icon: <Search size={16} /> },
];

const getModifierKeyLabel = () => {
  if (typeof navigator === 'undefined') return 'Ctrl';
  return navigator.platform.toLowerCase().includes('mac') ? '⌘' : 'Ctrl';
};

const DesktopNav = () => {
  const openCommandPalette = useUIStore((state) => state.openCommandPalette);

  // const supabase = createServerComponentClient<Database>({ cookies });
  // const { data: { session } = {} } = await supabase.auth.getSession();

  return (
    <header className="fixed top-0 z-10 w-full bg-background border-b border-border print:hidden">
      <nav className="mx-auto max-w-4xl px-6 lg:px-0" aria-label="Top">
        <div className="flex gap-4 h-16 w-full items-center justify-between lg:border-none">
          <div className="flex items-center gap-8 flex-1">
            <div className="hidden space-x-8 sm:flex">
              {navigation.map((link) => (
                <NavigationLink key={link.name} href={link.href}>
                  {link.icon || null}
                  <span>{link.name}</span>
                </NavigationLink>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={openCommandPalette}
          >
            <Search size={16} />
            <span className="hidden sm:inline">Command</span>
            <span className="ml-1 hidden items-center gap-1 text-xs text-muted-foreground sm:inline-flex">
              <kbd className="rounded border bg-muted px-1.5 py-0.5">
                {getModifierKeyLabel()}
              </kbd>
              <kbd className="rounded border bg-muted px-1.5 py-0.5">K</kbd>
            </span>
          </Button>
          <FeedbackButton />
          <ThemeToggle />
          {/* <UserAvatar session={session} /> */}
        </div>
      </nav>
    </header>
  );
};

export default DesktopNav;
