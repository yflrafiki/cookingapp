
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function CookModePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <Image src="https://placehold.co/600x400.png" alt="Cooking" width={600} height={400} className="w-full h-auto" data-ai-hint="person cooking" />
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="font-headline text-3xl">Cook Mode</CardTitle>
          <p className="mt-2 text-muted-foreground">Follow recipes step-by-step.</p>
        </CardContent>
      </Card>
    </div>
  );
}
