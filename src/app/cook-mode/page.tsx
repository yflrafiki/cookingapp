
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChefHat, ArrowLeft } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Skeleton } from '@/components/ui/skeleton';
import type { Recipe } from '@/types';
import Link from 'next/link';

function CookModeLoader() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                 <Skeleton className="h-10 w-48" />
                 <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                             <Skeleton className="w-full h-40" />
                        </CardHeader>
                        <CardContent className="space-y-2">
                             <Skeleton className="h-6 w-3/4" />
                             <Skeleton className="h-4 w-full" />
                             <Skeleton className="h-4 w-4/5" />
                             <Skeleton className="h-10 w-full mt-2" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}


export default function CookModePage() {
  const { recipes, isLoading } = useAppContext();
  const router = useRouter();

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
          <Link href="/recipes">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="flex flex-col">
            <CardHeader className="p-0">
              <Image src={recipe.image} alt={recipe.title} width={400} height={200} className="w-full h-40 object-cover rounded-t-lg" data-ai-hint={recipe.dataAiHint} />
            </CardHeader>
            <CardContent className="p-4 flex-grow flex flex-col">
              <CardTitle className="font-headline text-xl">{recipe.title}</CardTitle>
              <CardDescription className="mt-2 text-muted-foreground flex-grow">{recipe.description}</CardDescription>
              <Button onClick={() => router.push(`/cook-mode/${recipe.id}`)} className="w-full mt-4">
                <ChefHat className="mr-2 h-4 w-4" />
                Start Cooking
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
