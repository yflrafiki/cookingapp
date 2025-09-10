'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Recipe } from "@/types";
import {  Search, ChevronLeft, CircleDot, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { useState, useMemo } from "react";

const allRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Jollof Rice',
    description: 'A classic West African dish, rich in flavor and tradition.',
    image: '/jollof flavour.jpg',
    dataAiHint: 'jollof rice',
    // rating: 4.5,
    // cookTime: '45 min',
    // difficulty: 'Medium',
    ingredients: ['Tomatoes', 'Onions', 'Salt', 'Thyme'],
    steps: [],
  },
  {
    id: '2',
    title: 'Jollof Rice',
    description: 'A classic West African dish, rich in flavor and tradition.',
    image: '/noddles.jpg',
    dataAiHint: 'jollof rice',
    // rating: 4.5,
    // cookTime: '45 min',
    // difficulty: 'Medium',
    ingredients: ['Bay Leaves', 'Curry Powder', 'Garlic'],
    steps: [],
  },
  {
    id: '3',
    title: 'Jollof Rice',
    description: 'A classic West African dish, rich in flavor and tradition.',
    image: '/indai.jpg',
    dataAiHint: 'jollof rice',
    // rating: 4.5,
    // cookTime: '45 min',
    // difficulty: 'Medium',
    ingredients: ['Bay Leaves', 'Curry Powder', 'Garlic'],
    steps: [],
  },
  {
    id: '4',
    title: 'Jollof Rice',
    description: 'A classic West African dish, rich in flavor and tradition.',
    image: '/jollof flavour.jpg',
    dataAiHint: 'jollof rice',
    // rating: 4.5,
    // cookTime: '45 min',
    // difficulty: 'Medium',
    ingredients: ['Bay Leaves', 'Curry Powder', 'Garlic'],
    steps: [],
  },
];

const IngredientTag = ({ name }: { name: string }) => (
  <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary/90 border border-primary/20">
    <span>{name}</span>
    <XCircle className="h-3 w-3 text-primary/50" />
  </div>
);

const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
 <Card className="overflow-hidden border bg-card">
    <CardContent className="p-4 flex gap-4">
      <div className="flex-1 space-y-2">
        <CardTitle className="font-headline text-lg">{recipe.title}</CardTitle>
          <Separator />
          <CardDescription className="text-sm text-muted-foreground line-clamp-3">
          {recipe.description}
        </CardDescription>
      </div>
      <div className="flex-shrink-0">
        <Image src={recipe.image} alt={recipe.title} width={80} height={80} className="w-30 h-20  rounded-lg object-cover" data-ai-hint="jollof rice" />
      </div>
    </CardContent>
      <CardFooter className="p-4 pt-0">
       <div className="flex flex-wrap gap-2">
          {recipe.ingredients?.map((ingredient) => (
            <IngredientTag key={ingredient} name={ingredient} />
          ))}
        </div>
    </CardFooter>
  </Card>
);

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = useMemo(() => {
    if (!searchTerm) {
      return allRecipes;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return allRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(lowercasedTerm) ||
      recipe.description.toLowerCase().includes(lowercasedTerm) ||
      (recipe.ingredients && recipe.ingredients.some(ing => ing.toLowerCase().includes(lowercasedTerm)))

    );
  }, [searchTerm]);
  
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="font-headline text-3xl">Recipes</h1>
        <Button variant="ghost" size="icon" className="rounded-full bg-card shadow-sm border" asChild>
          <Link href="/">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
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

      <div className="grid grid-cols-1 gap-4">
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
