'use client';

import { cn } from '@/lib/utils';
import { Home, Youtube, Utensils, Settings, BookUser } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const mainNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/videos', label: 'Videos', icon: Youtube },
  { href: '/recipes', label: 'Recipe', icon: Utensils },
  { href: '/settings',label: 'Settings', icon: Settings },
  { href: '/my-recipes', label: 'My Recipes', icon: BookUser },
  // { href: '/add-recipe', label: 'Add Recipe', icon: Utensils },
  
];

function NavLink({ href, icon: Icon, isActive }: { href: string; icon: React.ElementType, isActive: boolean }) {
  return (
    <Link href={href} className="flex flex-col items-center justify-center py-2 px-1 text-xs transition-colors duration-200 min-w-0 flex-1">
      <Icon
        className={cn('h-6 w-6 mb-1', isActive && 'text-primary')}
      />
      <span className="truncate w-full text-center leading-tight">
        {mainNavLinks.find(link => link.href === href)?.label}
      </span>
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
    <nav className="fixed bottom-3 left-1/2  z-[100] h-[5rem] w-[calc(100%-2rem)] -translate-x-1/2 rounded-2xl border border-border/50 bg-background shadow-lg md:hidden">
      <div className="flex h-full items-stretch justify-center px-1">
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