
'use client';
import { useState , useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import type { Recipe } from "@/types";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

import { useAppContext } from "@/context/AppContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useListRecipes } from "@/hooks/use-recipes";
import { useParams, useRouter } from 'next/navigation';

  


const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <Card className="overflow-hidden  bg-card h-[fit-content] lg:flex flex-col
   shadow-none rounded-[5px]">
    <Link href={`/my-recipes/${recipe.id}`} className="block h-full flex flex-col">
      <CardContent className="p-4 flex gap-4 flex-grow">
        <div className="flex-1 space-y-2">
          <CardTitle className="font-headline text-lg">{recipe.title}</CardTitle>
          {/* <Separator /> */}
          <CardDescription className="text-sm text-muted-foreground line-clamp-3 flex-grow">
            {recipe.description}
          </CardDescription>
        </div>{
          recipe.image && (
            <div className="flex-shrink-0">
              <Image src={recipe.image} 
              unoptimized
              alt={recipe.title} width={80} height={80} className="w-20 h-20 rounded-lg object-cover" data-ai-hint={recipe.dataAiHint || 'food'} />
            </div>
          )
        }
      </CardContent>
    </Link>
  </Card>
);

export default function MyRecipesPage() {


  const [isLoading, setIsLoading] = useState(true);
  const listRecipes = useListRecipes();
  const [recipes , setRecipes] = useState<Recipe[]>([]);

  const router = useRouter();


  useEffect(function(){
  
      listRecipes().then((data) => {
        setRecipes(data);
        setIsLoading(false);
      });

    }, [listRecipes])



  if (isLoading) {
    return (
        <div className="space-y-6 px-4 py-4">
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
    <div className="space-y-6 h-full px-4 py-4 pb-[15rem]">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        
        ): (
          <div className="flex flex-col">
          <p className="text-muted-foreground text-center mt-[50%]">You haven't added any recipes yet.</p>
          <Button variant="default" 
          className="w-[100px] mx-auto my-[10px] rounded-[5px] text-white"
          onClick={() => router.push('/add-recipe')}> Add Recipe</Button>
          </div>
        )}
      </div>
    </div>
  );
}
