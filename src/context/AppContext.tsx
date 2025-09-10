
'use client';

import React, { createContext, useState, useContext, ReactNode, useMemo, useEffect } from 'react';
import type { Recipe } from '@/types';
import { allRecipes as defaultRecipes } from '@/lib/recipes';

interface AppContextType {
  largeText: boolean;
  setLargeText: (value: boolean) => void;
  textSize: number;
  setTextSize: (value: number) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  theme: 'light' | 'dark';
  setTheme: (value: 'light' | 'dark') => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [largeText, setLargeTextState] = useState(false);
  const [textSize, setTextSizeState] = useState(33);
  const [highContrast, setHighContrastState] = useState(false);
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [recipes, setRecipes] = useState<Recipe[]>(defaultRecipes);
  const [isLoading, setIsLoading] = useState(true);

  // Effect for initial loading from localStorage
  useEffect(() => {
    try {
      const storedRecipes = localStorage.getItem('recipes');
      if (storedRecipes) {
        const parsed = JSON.parse(storedRecipes);
        if(Array.isArray(parsed) && parsed.length > 0) {
          setRecipes(parsed);
        } else {
           localStorage.setItem('recipes', JSON.stringify(defaultRecipes));
           setRecipes(defaultRecipes);
        }
      } else {
        localStorage.setItem('recipes', JSON.stringify(defaultRecipes));
        setRecipes(defaultRecipes);
      }

      const storedLargeText = localStorage.getItem('largeText');
      if (storedLargeText) setLargeTextState(JSON.parse(storedLargeText));

      const storedTextSize = localStorage.getItem('textSize');
      if (storedTextSize) setTextSizeState(JSON.parse(storedTextSize));
      
      const storedHighContrast = localStorage.getItem('highContrast');
      if (storedHighContrast) setHighContrastState(JSON.parse(storedHighContrast));
      
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) setThemeState(storedTheme as 'light' | 'dark');

    } catch (e) {
      console.error("Failed to access or parse localStorage on initial load", e);
      setRecipes(defaultRecipes);
    } finally {
      setIsLoading(false);
    }
  // This effect should run only once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect for saving recipes to localStorage whenever they change
  useEffect(() => {
    // We don't save during the initial load
    if (!isLoading) {
      try {
        localStorage.setItem('recipes', JSON.stringify(recipes));
      } catch (e) {
        console.error("Failed to save recipes to localStorage", e);
      }
    }
  }, [recipes, isLoading]);

  const setLargeText = (value: boolean) => {
    setLargeTextState(value);
    localStorage.setItem('largeText', JSON.stringify(value));
  };

  const setTextSize = (value: number) => {
    setTextSizeState(value);
    localStorage.setItem('textSize', JSON.stringify(value));
  };
  
  const setHighContrast = (value: boolean) => {
    setHighContrastState(value);
    localStorage.setItem('highContrast', JSON.stringify(value));
  };

  const setTheme = (value: 'light' | 'dark') => {
    setThemeState(value);
    localStorage.setItem('theme', value);
  };
  
  const addRecipe = (recipe: Recipe) => {
    setRecipes(prevRecipes => [...prevRecipes, recipe]);
  };

  const updateRecipe = (updatedRecipe: Recipe) => {
    setRecipes(prevRecipes => prevRecipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
  };

  const deleteRecipe = (id: string) => {
    setRecipes(prevRecipes => prevRecipes.filter(r => r.id !== id));
  };

  const contextValue = useMemo(() => ({
    largeText,
    setLargeText,
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
    theme,
    setTheme,
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    isLoading,
  }), [largeText, textSize, highContrast, theme, recipes, isLoading]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
