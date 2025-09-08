
'use client';

import React, { createContext, useState, useContext, ReactNode, useMemo, useEffect } from 'react';

interface AppContextType {
  largeText: boolean;
  setLargeText: (value: boolean) => void;
  textSize: number;
  setTextSize: (value: number) => void;
  highContrast?: boolean;
  setHighContrast?: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [largeText, setLargeTextState] = useState(false);
  const [textSize, setTextSizeState] = useState(33);
  const [highContrast, setHighContrastState] = useState(false);

  useEffect(() => {
    const storedLargeText = localStorage.getItem('largeText');
    const storedTextSize = localStorage.getItem('textSize');
    const storedHighContrast = localStorage.getItem('highContrast');

    if (storedLargeText) {
      setLargeTextState(JSON.parse(storedLargeText));
    }
    if (storedTextSize) {
      setTextSizeState(JSON.parse(storedTextSize));
    }
    if (storedHighContrast) {
      setHighContrastState(JSON.parse(storedHighContrast));
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

  const setHighContrast = (value: boolean) => {
    setHighContrastState(value);
    localStorage.setItem('highContrast', JSON.stringify(value));
  };

  const contextValue = useMemo(() => ({
    largeText,
    setLargeText,
    textSize,
    setTextSize,
    highContrast,
    setHighContrast
  }), [largeText, textSize, highContrast]);

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
