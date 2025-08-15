
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
    borderColor: "border-[#71AABF]",
    shadow: "drop-shadow-find-recipe-shadow",
  },
  {
    title: "Voice Search",
    icon: Mic,
    backgroundColor: "bg-[#E2B440]",
    href: "#",
    borderColor: "border-[#CBB680]",
    shadow: "drop-shadow-voice-search",

  },
  {
    title: "Cook Mode",
    icon: ChefHat,
    backgroundColor: "bg-[#93C445]",
    href: "/cook-mode",
    borderColor: "border-[#91A571]",
    shadow: "drop-shadow-cook-mode",
  },
  {
    title: "Notes",
    icon: FileText,
    backgroundColor: "bg-[#CA30BA]",
    href: "/add-recipe",
    borderColor: "border-[#A26B9C]",
    shadow: "drop-shadow-notes",
  },
];
