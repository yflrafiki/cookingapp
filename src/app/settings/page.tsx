
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Text, Bell, Palette, Lock, Contrast, Volume2, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";

interface SettingItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  // href?: string;
  action?: React.ReactNode;
}

const SettingItem = ({ icon: Icon, title, description, action }: SettingItemProps) => (
  <div className="flex items-center gap-4 py-4">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
      <Icon className="h-5 w-5" />
    </div>
    <div className="flex-1">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </div>
  
);

// const accessibilitySettings: SettingItemProps[] = [
//   { icon: Text, title: "Large Text", description: "Increase text size for better readability" },
// ];

// const otherSettings: SettingItemProps[] = [
//   { icon: Bell, title: "Notifications", description: "Manage how you receive alerts" },
//   { icon: Palette, title: "Appearance", description: "Customize colors and theme" },
//   { icon: Lock, title: "Privacy", description: "Control your data and security" },
// ];

export default function SettingsPage() {
  //  const [largeText, setLargeText] = useState(false);
  // const [textSize, setTextSize] = useState(33);
  const { largeText, setLargeText, textSize, setTextSize, highContrast, setHighContrast } = useAppContext();
  const [voiceGuidance, setVoiceGuidance] = useState(false);
  const [recipeUpdates, setRecipeUpdates] = useState(true);
  const [cookingReminders, setCookingReminders] = useState(false);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-[#333333] text-[24px]">Settings</h1>
          <p className="text-[#5D5A5A] font-normal text-[12px]">Customize your CookingCompanion experience</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-card shadow-sm border" asChild>
          <Link href="/">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
      </header>

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-[16px] text-[#333333] font-semibold">Accessibility</h3>
          <div className="flex flex-col text-[14px] font-normal text-[#000000] divide-y divide-border">
             <div>
              <SettingItem 
                icon={Text} 
                title="Large Text" 
                description="Increase text size for better readability"
                action={<Switch checked={largeText} onCheckedChange={setLargeText} />}
              />
              {largeText && (
                <div className="pb-4 space-y-4">
                  <Card className="bg-primary/10 border-primary/20">
                    <CardContent className="p-4 text-center">
                      <p 
                        className={cn(
                          'transition-all duration-300',
                        )}
                        style={{ fontSize: `clamp(1rem, ${1 + (textSize / 100) * 0.5}rem, 2rem)`}}
                      >
                        &quot;Add 2 cups of flour and mix gently until combined&quot;
                      </p>
                    </CardContent>
                  </Card>
                  <Slider value={[textSize]} onValueChange={(value) => setTextSize(value[0])} />
                </div>
              )}
            </div>
            <SettingItem 
              icon={Contrast} 
              title="High Contrast" 
              description="Increase contrast for better readability"
              action={<Switch checked={highContrast} onCheckedChange={setHighContrast} />}
            />
            <SettingItem 
              icon={Volume2} 
              title="Voice Guidance" 
              description="Enable voice-over for navigation"
              action={<Switch checked={voiceGuidance} onCheckedChange={setVoiceGuidance} />}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-[16px] text-[#333333] font-semibold">Notifications</h3>
           <div className="flex flex-col divide-y divide-border">
             <SettingItem 
              icon={Bell} 
              title="Recipe Updates" 
              description="Get notified about new recipes"
              action={<Switch checked={recipeUpdates} onCheckedChange={setRecipeUpdates} />}
            />
             <SettingItem 
              icon={Sparkles} 
              title="Cooking Reminders" 
              description="Reminders for cooking steps"
              action={<Switch checked={cookingReminders} onCheckedChange={setCookingReminders} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
