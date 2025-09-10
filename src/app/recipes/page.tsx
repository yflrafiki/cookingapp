
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Recipe } from "@/types";
import { Search, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useState, useMemo } from "react";
import { useAppContext } from "@/context/AppContext";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <Link href={`/recipes/${recipe.id}`} className="block h-full">
    <Card className="overflow-hidden border bg-card h-full hover:shadow-lg transition-shadow">
      <CardContent className="p-4 flex gap-4">
        <div className="flex-1 space-y-2">
          <CardTitle className="font-headline text-lg">{recipe.title}</CardTitle>
          <Separator />
          <CardDescription className="text-sm text-muted-foreground line-clamp-3">
            {recipe.description}
          </CardDescription>
        </div>
        <div className="flex-shrink-0">
          <Image src={recipe.image} alt={recipe.title} width={80} height={80} className="w-20 h-20 rounded-lg object-cover" data-ai-hint={recipe.dataAiHint || 'food'} />
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default function RecipesPage() {
  const { recipes, isLoading } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = useMemo(() => {
    if (!searchTerm) {
      return recipes;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(lowercasedTerm) ||
      (recipe.description && recipe.description.toLowerCase().includes(lowercasedTerm))
    );
  }, [searchTerm, recipes]);
  
  if (isLoading) {
    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div className="h-8 w-48 bg-muted rounded-md animate-pulse" />
                <div className="flex items-center gap-2">
                    <div className="h-10 w-24 bg-muted rounded-md animate-pulse" />
                    <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
                </div>
            </header>
            <div className="h-12 w-full bg-muted rounded-full animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-28 bg-muted rounded-lg animate-pulse" />
                ))}
            </div>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="font-headline text-3xl">Recipes</h1>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/add-recipe">Add Recipe</Link>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-card shadow-sm border" asChild>
            <Link href="/">
              <ChevronLeft className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </header>

       <div className="relative">
        <Input
          type="search"
          placeholder="What would you like to make?"
          className="w-full rounded-full bg-card pl-4 pr-10 py-5 border-2 border-primary/20 focus:border-primary/40"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        
        ): (
          <p className="text-muted-foreground col-span-full text-center">No recipes found matching your search.</p>
        )}
      </div>
    </div>
  );
}
