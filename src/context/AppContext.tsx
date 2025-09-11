
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
  theme: 'light' | 'dark';
  setTheme: (value: 'light' | 'dark') => void;

}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [largeText, setLargeTextState] = useState(false);
  const [textSize, setTextSizeState] = useState(33);
  const [highContrast, setHighContrastState] = useState(false);
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');







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
  


  const contextValue = useMemo(() => ({
    largeText,
    setLargeText,
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
    theme,
    setTheme,
  }), [largeText, textSize, highContrast, theme,]);

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
