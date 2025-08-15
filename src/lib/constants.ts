
import type { Category, Action } from "@/types";
import { Salad, Cake, Coffee, UtensilsCrossed, Search, Mic, ChefHat, FileText } from "lucide-react";

export const CATEGORIES: Category[] = [
  {
    title: "Breakfast",
    icon: Coffee,
    backgroundColor: "bg-blue-100 dark:bg-blue-900/30",
    href: "/recipes?category=breakfast",
  },
  {
    title: "Lunch",
    icon: Salad,
    backgroundColor: "bg-green-100 dark:bg-green-900/30",
    href: "/recipes?category=lunch",
  },
  {
    title: "Dinner",
    icon: UtensilsCrossed,
    backgroundColor: "bg-red-100 dark:bg-red-900/30",
    href: "/recipes?category=dinner",
  },
  {
    title: "Dessert",
    icon: Cake,
    backgroundColor: "bg-purple-100 dark:bg-purple-900/30",
    href: "/recipes?category=dessert",
  },
];

export const ACTIONS: Action[] = [
  {
    title: "Find Recipe",
    icon: Search,
    backgroundColor: "bg-[#42ABD1]",
    href: "/recipes",
  },
  {
    title: "Voice Search",
    icon: Mic,
    backgroundColor: "bg-voice-search",
    href: "#",
  },
  {
    title: "Cook Mode",
    icon: ChefHat,
    backgroundColor: "bg-cook-mode",
    href: "/cook-mode",
  },
  {
    title: "Notes",
    icon: FileText,
    backgroundColor: "bg-ai-suggest",
    href: "/add-recipe",
  },
];
