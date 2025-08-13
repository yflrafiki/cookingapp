"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { suggestRecipes, type SuggestRecipesOutput } from "@/ai/flows/suggest-recipes";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Wand2, Loader2, Utensils, CircleDot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const formSchema = z.object({
  ingredients: z.string().min(10, {
    message: "Please list at least a few ingredients.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function RecipeSuggestionClient() {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<SuggestRecipesOutput["recipes"] | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setRecipes(null);
    try {
      const result = await suggestRecipes(data);
      setRecipes(result.recipes);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with our AI chef. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Available Ingredients</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., chicken breast, broccoli, garlic, olive oil, lemon"
                    className="resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter a comma-separated list of ingredients you have on hand.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="w-full md:w-auto">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Suggest Recipes
          </Button>
        </form>
      </Form>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h3 className="text-xl font-semibold font-headline">Our AI Chef is thinking...</h3>
            <p className="text-muted-foreground">Whipping up some delicious ideas for you!</p>
        </div>
      )}

      {recipes && recipes.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-headline">Suggested Recipes</h2>
          <Accordion type="single" collapsible className="w-full">
            {recipes.map((recipe, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-xl hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Utensils className="h-6 w-6 text-accent" />
                    <span>{recipe.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="bg-background/50">
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h4 className="font-bold text-lg mb-2">Ingredients</h4>
                        <p className="text-muted-foreground whitespace-pre-line">{recipe.ingredients}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Instructions</h4>
                        <div className="space-y-2">
                        {recipe.instructions.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                           <div key={i} className="flex items-start gap-3">
                             <CircleDot className="h-4 w-4 mt-1 shrink-0 text-accent" />
                             <p className="text-muted-foreground">{line.replace(/^\d+\.\s*/, '')}</p>
                           </div>
                         ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {recipes && recipes.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center">
            <h3 className="text-xl font-semibold font-headline">No recipes found</h3>
            <p className="text-muted-foreground">Our AI chef couldn't find any recipes with those ingredients. Try adding more items!</p>
        </div>
      )}
    </div>
  );
}
