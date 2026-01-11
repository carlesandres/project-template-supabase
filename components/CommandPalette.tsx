'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FileText, MessageSquarePlus, Search } from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from 'components/ui/command';
import { useUIStore } from 'stores/ui-store';

type PaletteItem = {
  label: string;
  shortcut?: string;
  icon?: React.ReactNode;
  onSelect: () => void;
};

const getModifierKeyLabel = () => {
  if (typeof navigator === 'undefined') return 'Ctrl';
  return navigator.platform.toLowerCase().includes('mac') ? '⌘' : 'Ctrl';
};

const CommandPalette = () => {
  const router = useRouter();

  const open = useUIStore((state) => state.commandPalette.open);
  const setOpen = useUIStore((state) => state.setCommandPaletteOpen);
  const close = useUIStore((state) => state.closeCommandPalette);
  const toggle = useUIStore((state) => state.toggleCommandPalette);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        toggle();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toggle]);

  const items: PaletteItem[] = [
    {
      label: 'Go to Learn',
      shortcut: 'G L',
      icon: <FileText className="mr-2 h-4 w-4" />,
      onSelect: () => {
        router.push('/');
        close();
      },
    },
    {
      label: 'Go to Stats',
      shortcut: 'G S',
      icon: <FileText className="mr-2 h-4 w-4" />,
      onSelect: () => {
        router.push('/stats');
        close();
      },
    },
    {
      label: 'Go to Search',
      shortcut: 'G /',
      icon: <Search className="mr-2 h-4 w-4" />,
      onSelect: () => {
        router.push('/search');
        close();
      },
    },
  ];

  const actions: PaletteItem[] = [
    {
      label: 'Open Feedback',
      shortcut: 'F B',
      icon: <MessageSquarePlus className="mr-2 h-4 w-4" />,
      onSelect: () => {
        // For now, just navigate to home where Feedback button exists
        // This is intentionally simple to demonstrate UI state management.
        router.push('/');
        close();
      },
    },
  ];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {items.map((item) => (
            <CommandItem
              key={item.label}
              onSelect={() => item.onSelect()}
              value={item.label}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.shortcut ? (
                <CommandShortcut>{item.shortcut}</CommandShortcut>
              ) : null}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          {actions.map((item) => (
            <CommandItem
              key={item.label}
              onSelect={() => item.onSelect()}
              value={item.label}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.shortcut ? (
                <CommandShortcut>{item.shortcut}</CommandShortcut>
              ) : null}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <div className="px-3 py-2 text-xs text-muted-foreground">
          Shortcut: {getModifierKeyLabel()}K
        </div>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
