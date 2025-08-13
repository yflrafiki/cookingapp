"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./nav-config";
import { cn } from "@/lib/utils";

export default function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="grid h-16 grid-cols-5 items-center">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
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
