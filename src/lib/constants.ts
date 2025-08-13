import type { Category } from "@/types";
import { Salad, Cake, Coffee, UtensilsCrossed } from "lucide-react";

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
