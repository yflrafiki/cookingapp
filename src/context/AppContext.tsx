
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
  userName: string;
  setUserName: (value: string) => void;
  textScaleMultiplier: number;
  setTextScaleMultiplier: (value: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [largeText, setLargeTextState] = useState(false);
  const [textSize, setTextSizeState] = useState(33);
  const [highContrast, setHighContrastState] = useState(false);
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [userName, setUserNameState] = useState('');
  const [textScaleMultiplier, setTextScaleMultiplierState] = useState(1);







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

  const setUserName = (value: string) => {
    setUserNameState(value);
    localStorage.setItem('userName', value);
  };

  const setTextScaleMultiplier = (value: number) => {
    setTextScaleMultiplierState(value);
    localStorage.setItem('textScaleMultiplier', value.toString());
  };

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedUserName = localStorage.getItem('userName');
    if (savedUserName) {
      setUserNameState(savedUserName);
    }
    
    const savedTextScaleMultiplier = localStorage.getItem('textScaleMultiplier');
    if (savedTextScaleMultiplier) {
      setTextScaleMultiplierState(parseFloat(savedTextScaleMultiplier));
    }
  }, []);

  // Apply text scaling multiplier to CSS custom property
  useEffect(() => {
    document.documentElement.style.setProperty('--text-scale-multiplier', textScaleMultiplier.toString());
  }, [textScaleMultiplier]);

  const contextValue = useMemo(() => ({
    largeText,
    setLargeText,
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
    theme,
    setTheme,
    userName,
    setUserName,
    textScaleMultiplier,
    setTextScaleMultiplier,
  }), [largeText, textSize, highContrast, theme, userName, textScaleMultiplier]);

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
