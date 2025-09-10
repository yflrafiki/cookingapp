
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import type { Recipe } from "@/types";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/context/AppContext";
import { Skeleton } from "@/components/ui/skeleton";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <Card className="overflow-hidden border bg-card h-full hover:shadow-lg transition-shadow flex flex-col">
    <Link href={`/recipes/${recipe.id}`} className="block h-full flex flex-col">
      <CardContent className="p-4 flex gap-4 flex-grow">
        <div className="flex-1 space-y-2">
          <CardTitle className="font-headline text-lg">{recipe.title}</CardTitle>
          <Separator />
          <CardDescription className="text-sm text-muted-foreground line-clamp-3 flex-grow">
            {recipe.description}
          </CardDescription>
        </div>
        <div className="flex-shrink-0">
          <Image src={recipe.image} alt={recipe.title} width={80} height={80} className="w-20 h-20 rounded-lg object-cover" data-ai-hint={recipe.dataAiHint || 'food'} />
        </div>
      </CardContent>
    </Link>
  </Card>
);

export default function MyRecipesPage() {
  const { recipes, isLoading } = useAppContext();
  
  if (isLoading) {
    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <Skeleton className="h-8 w-48" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-24 rounded-md" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-40 bg-muted rounded-lg animate-pulse" />
                ))}
            </div>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="font-headline text-3xl">My Recipes</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full bg-card shadow-sm border" asChild>
            <Link href="/">
              <ChevronLeft className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        
        ): (
          <p className="text-muted-foreground col-span-full text-center">You haven't added any recipes yet.</p>
        )}
      </div>
    </div>
  );
}
