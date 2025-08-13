import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecipesPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Our Recipes</CardTitle>
        </CardHeader>
        <CardContent>
          <p>A smart grid of recipes will be displayed here. It will be a vertical list on mobile and a multi-column grid on desktop with filtering and sorting options.</p>
        </CardContent>
      </Card>
    </div>
  );
}
