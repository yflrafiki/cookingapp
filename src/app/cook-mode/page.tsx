
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChefHat, ArrowLeft, Search } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Skeleton } from '@/components/ui/skeleton';
import type { Recipe } from '@/types';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

function CookModeLoader() {
    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <Skeleton className="h-8 w-48" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
            </header>
            <div className="h-12 w-full bg-muted rounded-full animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-40 bg-muted rounded-lg animate-pulse" />
                ))}
            </div>
        </div>
    );
}

const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <Card className="overflow-hidden border bg-card h-full hover:shadow-lg transition-shadow flex flex-col">
    <Link href={`/cook-mode/${recipe.id}`} className="block h-full flex flex-col">
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

export default function CookModePage() {
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
    return <CookModeLoader />;
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl">Cook Mode</h1>
          <p className="text-muted-foreground">Choose a recipe to start your guided cooking session.</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-card shadow-sm border" asChild>
          <Link href="/">
            <ArrowLeft className="h-6 w-6" />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
