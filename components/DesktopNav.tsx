'use client';
import React from 'react';
import NavigationLink from 'components/NavigationLink';
// import UserAvatar from 'components/UserAvatar';
import { AlignJustify, Activity, Search } from 'lucide-react';
import FeedbackButton from './FeedbackButton';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
// import { Database } from 'types/supabase';

const navigation = [
  { name: 'Learn', href: '/', icon: <AlignJustify size={16} /> },
  { name: 'Stats', href: '/stats', icon: <Activity size={16} /> },
  { name: 'Search', href: '/search', icon: <Search size={16} /> },
];

const DesktopNav = () => {
  // const supabase = createServerComponentClient<Database>({ cookies });
  // const { data: { session } = {} } = await supabase.auth.getSession();

  return (
    <header className="fixed top-0 z-10 w-full bg-white border-b border-gray-100 print:hidden">
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
          <FeedbackButton />
          {/* <UserAvatar session={session} /> */}
        </div>
      </nav>
    </header>
  );
};

export default DesktopNav;
