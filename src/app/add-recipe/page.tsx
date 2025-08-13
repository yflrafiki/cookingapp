import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddRecipePage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Add a New Recipe</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The form to add a new recipe will be here. It will be a full-screen wizard on mobile and a two-column layout on desktop.</p>
        </CardContent>
      </Card>
    </div>
  );
}
