
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Text, Bell, Palette, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from 'next/link';

interface SettingItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
}

const SettingItem = ({ icon: Icon, title, description, href = "#" }: SettingItemProps) => (
  <Link href={href} className="flex items-center gap-4 py-4">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
      <Icon className="h-5 w-5" />
    </div>
    <div className="flex-1">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </Link>
);

const accessibilitySettings: SettingItemProps[] = [
  { icon: Text, title: "Large Text", description: "Increase text size for better readability" },
];

const otherSettings: SettingItemProps[] = [
  { icon: Bell, title: "Notifications", description: "Manage how you receive alerts" },
  { icon: Palette, title: "Appearance", description: "Customize colors and theme" },
  { icon: Lock, title: "Privacy", description: "Control your data and security" },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl">Settings</h1>
          <p className="text-muted-foreground">Customize your CookingCompanion experience</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-card shadow-sm border" asChild>
          <Link href="/">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
      </header>

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Accessibility</h3>
          <div className="flex flex-col divide-y divide-border">
            {accessibilitySettings.map((item) => (
              <SettingItem key={item.title} {...item} />
            ))}
             {/* Duplicating for visual representation from image */}
            <SettingItem {...accessibilitySettings[0]} />
            <SettingItem {...accessibilitySettings[0]} />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Accessibility</h3>
           <div className="flex flex-col divide-y divide-border">
            {otherSettings.map((item) => (
              <SettingItem key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
