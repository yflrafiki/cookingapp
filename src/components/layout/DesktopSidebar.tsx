
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Home, Youtube, Utensils, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mainNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/videos', label: 'Videos', icon: Youtube },
  { href: '/add-recipe', label: 'Add Recipe', icon: Utensils },
];

const bottomNavLinks = [
    { href: '/settings',label: 'Settings', icon: Settings },
]

export default function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="hidden md:flex md:flex-col">
        <SidebarHeader>
          <div className="flex items-center gap-2">
             <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt="@shadcn" data-ai-hint="logo" />
                <AvatarFallback>CC</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">Cooking</h2>
          </div>
        </SidebarHeader>
        <SidebarContent className="flex-grow">
          <SidebarMenu>
            {mainNavLinks.map(link => (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton asChild isActive={pathname === link.href}>
                  <Link href={link.href}>
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="mt-auto">
            <SidebarMenu>
                 {bottomNavLinks.map(link => (
                    <SidebarMenuItem key={link.href}>
                      <SidebarMenuButton asChild isActive={pathname === link.href}>
                        <Link href={link.href}>
                            <link.icon className="h-5 w-5" />
                            {link.label}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                <Separator className="my-2" />
                 <div className="flex items-center gap-3 px-2 py-1">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="user avatar" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">User</p>
                        <p className="text-muted-foreground">user@example.com</p>
                    </div>
                </div>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  );
}
