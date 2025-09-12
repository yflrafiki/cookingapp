
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Recipe } from "@/types";
import { Search, ChevronLeft , Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useState, useMemo, useEffect } from "react";

import { listAll } from "./actions";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <Link href={`/recipes/${recipe.id}`} className="block h-full">
    <Card className="overflow-hidden border bg-card h-[fit-content] hover:shadow-lg transition-shadow">
      <CardContent className="p-4 flex gap-4">
        <div className="flex-1 space-y-2">
          <CardTitle className="font-headline text-lg">{recipe.title}</CardTitle>
          <Separator />
          <CardDescription className="text-sm text-muted-foreground line-clamp-3">
            {recipe.description}
          </CardDescription>
        </div>
        <div className="flex-shrink-0">
          <Image src={recipe.image} alt={recipe.title} width={80} height={80}
          unoptimized
           className="w-20 h-20 rounded-lg object-cover"
            data-ai-hint={recipe.dataAiHint || 'food'} />
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default function RecipesPage() {

  const [searchTerm, setSearchTerm] = useState('');

  const [isLoading , setIsLoading] = useState(true)

  const [recipes , setRecipes] = useState<Recipe[]>([])

  const [error , setError] = useState(null)

  useEffect(function(){

    setIsLoading(true)
    listAll(searchTerm).then(data =>{
      setRecipes(data)
      setIsLoading(false)
      setError(null)
    }).catch(error=>{
      console.error(error)
      setIsLoading(false)
      setError(error)
    })

  } , [searchTerm])



  


  return (
    <div className="space-y-6 p-4 h-full pb-[10rem]">
      <header className="flex items-center justify-between">
        <h1 className="font-headline text-3xl text-foreground">Recipes</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full bg-card shadow-sm border" asChild>
            <Link href="/">
              <ChevronLeft className="h-6 w-6 text-foreground" />
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

      {
        isLoading ? 
        <div className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="h-28 bg-muted rounded-lg animate-pulse" />
            ))}
        </div>
        </div>

        : 
        error ? 
        <div className="flex justify-center items-center h-full
           flex-col gap-4">
        <p className="text-foreground w-[70%] text-center">A network error occurred. Please try again later.</p>
      <Button variant="outline"
      className='rounded-[5px]'
       onClick={() => window.location.reload()}>Reload</Button>
        </div>

        :
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          
          ): (
            <p className="text-muted-foreground col-span-full text-center self-center mb-[20%]">
              {
                searchTerm ? "No recipes found matching your search" : "Oops we don't have anything to show for now."
              }
            </p>
          )}
        </div>
      }

    </div>
  );
}
