
import type { Category, Action } from "@/types";
import { Salad, Cake, Coffee, UtensilsCrossed, Search, Mic, ChefHat, Wand2 } from "lucide-react";

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
    backgroundColor: "bg-cyan-200",
    href: "/recipes",
  },
  {
    title: "Voice Search",
    icon: Mic,
    backgroundColor: "bg-yellow-200",
    href: "#",
  },
  {
    title: "Cook Mode",
    icon: ChefHat,
    backgroundColor: "bg-green-200",
    href: "/cook-mode",
  },
  {
    title: "AI Suggestions",
    icon: Wand2,
    backgroundColor: "bg-purple-200",
    href: "/suggest",
  },
];
