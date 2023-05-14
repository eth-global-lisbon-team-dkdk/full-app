import React, { useContext, useState, createContext, useRef } from "react";

const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const value = {
    currentAccount,
    setCurrentAccount,
    scrollToBottom,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      <div ref={messagesEndRef} />
    </AppContext.Provider>
  );
}