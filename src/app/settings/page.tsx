
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Text, Bell, Palette, Lock, Moon, Sun, Volume2, Sparkles } from "lucide-react";
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
      <p className="font-medium text-foreground">{title}</p>
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
  const { 
    largeText, 
    setLargeText, 
    textSize, 
    setTextSize, 
    theme, 
    setTheme,
    textScaleMultiplier,
    setTextScaleMultiplier
  } = useAppContext();
  const [voiceGuidance, setVoiceGuidance] = useState(false);
  const [recipeUpdates, setRecipeUpdates] = useState(true);
  const [cookingReminders, setCookingReminders] = useState(false);

  return (
    <div className="space-y-6 px-4 py-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-foreground text-2xl">Settings</h1>
          <p className="text-muted-foreground font-normal text-base">Customize your CookingCompanion experience</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-card shadow-sm border" asChild>
          <Link href="/">
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </Link>
        </Button>
      </header>

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-foreground font-semibold">Accessibility</h3>
          <div className="flex flex-col font-normal text-foreground divide-y divide-border">
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
                       className=""
                      >
                        &quot;Add 2 cups of flour and mix gently until combined&quot;
                      </p>
                    </CardContent>
                  </Card>
                  <Slider 
                  min={1}
                  step={0.00001}
                  value={[textScaleMultiplier]} 
                  max={1.1}
                  onValueChange={(value) => {
                    console.log(value)
                    setTextScaleMultiplier(value[0])}} 
                  
                  />
                </div>
              )}
            </div>
            <SettingItem 
              icon={theme === 'dark' ? Sun : Moon} 
              title="Dark Mode"
              description="Switch between light and dark themes"
              action={
                <Switch 
                  checked={theme === 'dark'} 
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
                />
              }
            />
         {/* <div className="pb-4 space-y-4">
                <Card className="bg-primary/10 border-primary/20">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                    <p className="text-lg font-semibold">Large Heading</p>
                    <p className="text-base">Regular body text that scales proportionally</p>
                    <p className="text-sm text-muted-foreground">Small caption text</p>
                  </CardContent>
                </Card>
              </div> */}
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
          <h3 className="text-foreground font-semibold">Notifications</h3>
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
