
"use client";

import React, { type ReactNode } from "react";
import MobileNavigation from "./MobileNavigation";
import DesktopSidebar from "./DesktopSidebar";
import { SidebarProvider } from "../ui/sidebar";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";


interface ResponsiveLayoutProps {
  children: ReactNode;
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const pathname = usePathname();
  const isVideoPage = pathname === '/videos';

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DesktopSidebar />
        <div className="flex flex-1 flex-col">
          <main className={cn(
            "flex-1",
            isVideoPage ? "md:p-8" : "p-4 sm:p-6 lg:p-8 pb-28 md:pb-8"
          )}>
            <div className={cn(
              "mx-auto h-full",
              isVideoPage ? "max-w-full" : "max-w-md md:max-w-none"
            )}>
              {children}
            </div>
          </main>
        </div>
        <MobileNavigation />
      </div>
    </SidebarProvider>
  );
}
