
'use client';

import { cn } from '@/lib/utils';
import { Home, Youtube, Utensils, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const mainNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/videos', label: 'Videos', icon: Youtube },
  { href: '/recipes', label: 'Add Recipe', icon: Utensils },
  // { href: '/add-recipe', label: 'Add Recipe', icon: Utensils },
  { href: '/settings',label: 'Settings', icon: Settings },
];

function NavLink({ href, icon: Icon, isActive }: { href: string; icon: React.ElementType, isActive: boolean }) {
  return (
    <Link href={href} className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
      <Icon
        className={cn('h-6 w-6', isActive && 'text-primary')}
      />
    </Link>
  );
}

export default function MobileNavigation() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="fixed bottom-4 left-1/2 z-[100] h-16 w-[calc(100%-2rem)] -translate-x-1/2 rounded-2xl border border-border/50 bg-background shadow-lg md:hidden">
      <div className="grid h-full grid-cols-4 items-center">
        {mainNavLinks.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            isActive={isClient ? pathname === link.href : false}
          />
        ))}
      </div>
    </nav>
  );
}
