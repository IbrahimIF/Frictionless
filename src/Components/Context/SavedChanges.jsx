// ThemeContext.js
import React, { createContext, useState, useEffect} from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("isDarkMode") === "true");
  const [codeTheme, setCodeTheme] = useState(localStorage.getItem("codeTheme") || 'defaultTheme');
  const [codeLanguage, setCodeLanguage] = useState(localStorage.getItem("codeLanguage") || 'javascript');
  const [activeMode, setActiveMode] = useState(localStorage.getItem("activeMode") || 'Default');
  const [clearCodeTrigger, setClearCodeTrigger] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState(false);



  const clearCode = () => {
    setClearCodeTrigger((prev) => !prev); // Toggle to ensure a change even if called multiple times
  };

  const updateCode = () => {
    setUpdateTrigger((prev) => !prev); // Toggle to ensure a change even if called multiple times
  };



  

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
    localStorage.setItem("codeTheme", codeTheme);
    localStorage.setItem("codeLanguage", codeLanguage);
    localStorage.setItem("activeMode", activeMode);
    localStorage.setItem("codeValue", codeValue);
  }, [isDarkMode, codeTheme, codeLanguage, activeMode, codeValue]);

  const contextValue = {
    isDarkMode,
    setIsDarkMode,
    codeTheme,
    setCodeTheme,
    codeLanguage,
    setCodeLanguage,
    clearCode,
    clearCodeTrigger,
    activeMode,
    setActiveMode,
    codeValue,
    setCodeValue,
    updateTrigger,
    setUpdateTrigger,
    updateCode,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};