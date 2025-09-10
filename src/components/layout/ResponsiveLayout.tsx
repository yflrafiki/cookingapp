
"use client";

import React, { type ReactNode } from "react";
import MobileNavigation from "./MobileNavigation";
import DesktopSidebar from "./DesktopSidebar";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";


interface ResponsiveLayoutProps {
  children: ReactNode;
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const pathname = usePathname();
  const isVideoPage = pathname === '/videos';
  const { largeText, textSize, theme } = useAppContext();

  const dynamicTextStyle = largeText ? { fontSize: `clamp(1rem, ${1 + (textSize / 100) * 0.5}rem, 2rem)` } : {};

  return (
      <div className={cn("flex min-h-screen w-full bg-background font-body antialiased", theme === 'dark' && 'dark')} style={dynamicTextStyle}>
        <DesktopSidebar />
        <div className="flex flex-1 flex-col min-w-0">
          <main className={cn(
            "flex-1 px-2 py-4 sm:p-4 lg:p-8 pb-28 md:pb-8",
             isVideoPage && "p-0 md:p-8" 
          )}>
            <div className={cn(
              "mx-auto h-full w-full",
              !isVideoPage && "max-w-md md:max-w-7xl"
            )}>
              {children}
            </div>
          </main>
        </div>
        <MobileNavigation />
      </div>
  );
}
