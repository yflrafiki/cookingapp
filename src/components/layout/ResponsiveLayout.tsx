"use client";

import React, { type ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import DesktopSidebar from "./DesktopSidebar";
import MobileNavigation from "./MobileNavigation";
import Header from "./Header";
import { SidebarProvider } from "../ui/sidebar";

interface ResponsiveLayoutProps {
  children: ReactNode;
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DesktopSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
        {isMobile && <MobileNavigation />}
      </div>
    </SidebarProvider>
  );
}
