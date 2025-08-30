
'use client';

import React, { createContext, useState, useContext, ReactNode, useMemo, useEffect } from 'react';

interface AppContextType {
  largeText: boolean;
  setLargeText: (value: boolean) => void;
  textSize: number;
  setTextSize: (value: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [largeText, setLargeTextState] = useState(false);
  const [textSize, setTextSizeState] = useState(33);

  useEffect(() => {
    const storedLargeText = localStorage.getItem('largeText');
    const storedTextSize = localStorage.getItem('textSize');

    if (storedLargeText) {
      setLargeTextState(JSON.parse(storedLargeText));
    }
    if (storedTextSize) {
      setTextSizeState(JSON.parse(storedTextSize));
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

  const contextValue = useMemo(() => ({
    largeText,
    setLargeText,
    textSize,
    setTextSize,
  }), [largeText, textSize]);

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
