import React, { createContext, useState } from 'react';

export interface AuthContextProps {
  activeFile?: any;
  setActiveFile?: any;
}

export const ActiveFileContext = createContext<AuthContextProps>({});

export function ActiveFileProvider({ children }: any) {
  const [activeFile, setActiveFile] = useState('about');

  return (
    <ActiveFileContext.Provider value={{
      activeFile,
      setActiveFile
    }}>
      {children}
    </ActiveFileContext.Provider>
  )
}