import RecipeSuggestionClient from "@/components/suggest/RecipeSuggestionClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SuggestPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8">
       <Card className="border-2 border-primary/50 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl flex items-center gap-2">
              <span>AI Recipe Suggester</span>
              <span className="text-xs font-mono py-0.5 px-1.5 rounded-md bg-primary/20 text-primary-foreground">BETA</span>
            </CardTitle>
            <CardDescription>
              Got some ingredients and no ideas? Let our AI chef inspire your next meal!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecipeSuggestionClient />
          </CardContent>
        </Card>
    </div>
  );
}
