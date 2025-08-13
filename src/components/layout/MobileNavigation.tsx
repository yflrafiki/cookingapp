
'use client';

import { cn } from '@/lib/utils';
import { Home, Play, Utensils, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mainNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/recipes', label: 'Recipes', icon: Play },
  { href: '/cook-mode', label: 'Cook', icon: Utensils },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 border-t bg-background/95 backdrop-blur-sm md:left-1/2 md:-translate-x-1/2 md:max-w-md md:bottom-4 md:rounded-full md:border">
      <div className="grid h-full grid-cols-4 items-center">
        {mainNavLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center justify-center gap-1 text-muted-foreground"
            >
              <link.icon
                className={cn('h-6 w-6', isActive && 'text-primary')}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
