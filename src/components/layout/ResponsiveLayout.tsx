
"use client";

import React, { type ReactNode } from "react";
import MobileNavigation from "./MobileNavigation";
import { SidebarProvider } from "../ui/sidebar";

interface ResponsiveLayoutProps {
  children: ReactNode;
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <div className="flex flex-1 flex-col">
          <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-28 md:pb-32 bg-background">
            <div className="mx-auto max-w-md">
              {children}
            </div>
          </main>
        </div>
        <MobileNavigation />
      </div>
    </SidebarProvider>
  );
}
