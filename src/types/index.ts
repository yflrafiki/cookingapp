
import type { LucideIcon } from "lucide-react";

export interface Category {
  title: string;
  icon: LucideIcon;
  backgroundColor: string;
  href: string;
  
}

export interface Action {
  title: string;
  icon: LucideIcon;
  backgroundColor: string;
  href: string;
  borderColor?: string;
  shadow?: string;
}

export interface Recipe {
  dataAiHint: any;
  steps: any;
  id: string;
  title: string;
  description: string;
  image: string;
  rating?: number;
  cookTime?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  layout?: 'list' | 'grid' | 'compact';
  ingredients?: string[];
}
