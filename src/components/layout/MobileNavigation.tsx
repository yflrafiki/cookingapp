"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./nav-config";
import { cn } from "@/lib/utils";
import { Home, BookOpen, Wand2, PlusSquare, ChefHat } from "lucide-react";

const mainNavLinks = [
  { href: '/recipes', label: 'Recipes', icon: BookOpen },
  { href: '/suggest', label: 'Suggest', icon: Wand2 },
  { href: '/add-recipe', label: 'Add', icon: PlusSquare },
  { href: '/cook-mode', label: 'Cook', icon: ChefHat },
];


export default function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm">
      <div className="grid h-16 grid-cols-4 items-center">
        {mainNavLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center justify-center gap-1 text-muted-foreground"
            >
              <link.icon
                className={cn(
                  "h-6 w-6 transition-colors",
                  isActive && "text-primary"
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  isActive && "text-primary"
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
