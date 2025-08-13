import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The settings panel will be available here. It will be a list view on mobile and a two-panel layout on desktop.</p>
        </CardContent>
      </Card>
    </div>
  );
}
