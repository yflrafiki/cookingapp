"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChefHat } from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { navLinks } from "./nav-config";
import { useIsMobile } from "@/hooks/use-mobile";

export default function DesktopSidebar() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2">
           <ChefHat className="w-8 h-8 text-primary" />
           <h1 className="text-xl font-bold font-headline text-foreground group-data-[collapsible=icon]:hidden">
            Culinary Canvas
           </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === link.href}
                  tooltip={{
                    children: link.label,
                    side: "right",
                  }}
                >
                  <link.icon />
                  <span>{link.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
