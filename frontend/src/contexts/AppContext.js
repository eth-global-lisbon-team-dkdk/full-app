import React, { useContext, useState, createContext } from "react";

const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState(null);

  const value = {
    currentAccount,
    setCurrentAccount,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}