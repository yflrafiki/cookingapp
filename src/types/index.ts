
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
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients?: string[];
  steps?: string[] | string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;  
  thumbnail: string;
  ingredients?: string[];
  steps?: string[];
}
