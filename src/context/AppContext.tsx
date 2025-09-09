
'use client';

import React, { createContext, useState, useContext, ReactNode, useMemo, useEffect } from 'react';

interface AppContextType {
  largeText: boolean;
  setLargeText: (value: boolean) => void;
  textSize: number;
  setTextSize: (value: number) => void;
  theme: 'light' | 'dark';
  setTheme: (value: 'light' | 'dark') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [largeText, setLargeTextState] = useState(false);
  const [textSize, setTextSizeState] = useState(33);
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedLargeText = localStorage.getItem('largeText');
    const storedTextSize = localStorage.getItem('textSize');
    const storedTheme = localStorage.getItem('theme');

    if (storedLargeText) {
      setLargeTextState(JSON.parse(storedLargeText));
    }
    if (storedTextSize) {
      setTextSizeState(JSON.parse(storedTextSize));
    }
    if (storedTheme) {
      setThemeState(storedTheme as 'light' | 'dark');
    }
  }, []);

  const setLargeText = (value: boolean) => {
    setLargeTextState(value);
    localStorage.setItem('largeText', JSON.stringify(value));
  };

  const setTextSize = (value: number) => {
    setTextSizeState(value);
    localStorage.setItem('textSize', JSON.stringify(value));
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
    theme,
    setTheme
  }), [largeText, textSize, theme]);

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
