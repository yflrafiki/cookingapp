
'use client';

import { cn } from '@/lib/utils';
import { Bookmark, Home, Plus, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mainNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/recipes', label: 'Saved', icon: Bookmark },
  { href: '/add-recipe', label: 'Add', icon: Plus },
  { href: '/settings', label: 'Profile', icon: User },
];

export default function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 border-t bg-background/95 backdrop-blur-sm">
      <div className="relative grid h-full grid-cols-4 items-center">
        {mainNavLinks.map((link, index) => {
          const isActive = pathname === link.href;
          if (link.label === 'Add') {
            return (
              <div
                key={link.href}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-3/4"
              >
                <Link
                  href={link.href}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background"
                >
                  <link.icon className="h-8 w-8" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              </div>
            );
          }
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center justify-center gap-1 text-muted-foreground"
            >
              <link.icon
                className={cn('h-6 w-6', isActive && 'text-primary')}
              />
              <span
                className={cn(
                  'text-xs font-medium',
                  isActive && 'text-primary'
                )}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
