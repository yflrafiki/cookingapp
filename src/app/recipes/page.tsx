
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Recipe } from "@/types";
import { Bookmark, Search, Star } from "lucide-react";
import Image from "next/image";

const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Jollof Rice',
    description: 'A classic West African dish, rich in flavor and tradition.',
    image: '/jollof flavour.jpg',
    rating: 4.5,
    cookTime: '45 min',
    difficulty: 'Medium',
  },
  {
    id: '2',
    title: 'Jollof Rice',
    description: 'A classic West African dish, rich in flavor and tradition.',
    image: '/noddles.jpg',
    rating: 4.5,
    cookTime: '45 min',
    difficulty: 'Medium',
  },
  {
    id: '3',
    title: 'Jollof Rice',
    description: 'A classic West African dish, rich in flavor and tradition.',
    image: '/indai.jpg',
    rating: 4.5,
    cookTime: '45 min',
    difficulty: 'Medium',
  },
  {
    id: '4',
    title: 'Jollof Rice',
    description: 'A classic West African dish, rich in flavor and tradition.',
    image: '/jollof flavour.jpg',
    rating: 4.5,
    cookTime: '45 min',
    difficulty: 'Medium',
  },
];

const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <Card className="overflow-hidden">
    <CardContent className="p-0 flex justify-between">
      
      <div className="p-4 flex flex-col justify-between">
        <div>
          <CardTitle className="font-headline text-lg">{recipe.title}</CardTitle>
          <CardDescription className="text-xs mt-1">{recipe.description}</CardDescription>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{recipe.rating}</span>
            </div>
            <span>{recipe.cookTime}</span>
            <span>{recipe.difficulty}</span>
            <Button variant="ghost" size="icon" className="w-6 h-6">
                <Bookmark className="w-4 h-4"/>
            </Button>
        </div>
      </div>
      <Image src={recipe.image} alt={recipe.title} width={150} height={100} className="object-cover" data-ai-hint="jollof rice"/>
    </CardContent>
  </Card>
);

export default function RecipesPage() {
  return (
    <div className="container mx-auto py-8 space-y-6">
       <CardHeader className="p-0">
          <CardTitle className="font-headline text-3xl">Recipes</CardTitle>
        </CardHeader>

       <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="What would you like to make?"
          className="w-full rounded-md bg-secondary pl-10 pr-4 py-5 text-base"
        />
      </div>

      <div className="space-y-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
