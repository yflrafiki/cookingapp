
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Settings</CardTitle>
          <CardDescription>Customize your cooking and app experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Accessibility</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="large-text" className="flex flex-col gap-1">
                  <span>Large Text</span>
                  <span className="text-sm font-normal text-muted-foreground">Increase text size across the app</span>
                </Label>
                <Switch id="large-text" />
              </div>
               <div className="flex items-center justify-between">
                <Label htmlFor="large-text-2" className="flex flex-col gap-1">
                  <span>Large Text</span>
                   <span className="text-sm font-normal text-muted-foreground">Increase text size across the app</span>
                </Label>
                <Switch id="large-text-2" />
              </div>
            </div>
          </div>
           <div>
            <h3 className="text-lg font-medium mb-2">Accessibility</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="large-text-3" className="flex flex-col gap-1">
                  <span>Large Text</span>
                   <span className="text-sm font-normal text-muted-foreground">Increase text size across the app</span>
                </Label>
                <Switch id="large-text-3" />
              </div>
               <div className="flex items-center justify-between">
                <Label htmlFor="large-text-4" className="flex flex-col gap-1">
                  <span>Large Text</span>
                   <span className="text-sm font-normal text-muted-foreground">Increase text size across the app</span>
                </Label>
                <Switch id="large-text-4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
