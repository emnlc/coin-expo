import React, { createContext, useContext, useState, useEffect } from "react";

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useDarkMode = () => useContext(DarkModeContext);

interface DarkModeProviderProps {
  children: React.ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  // system preference
  const getSystemPreference = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [darkMode, setDarkMode] = useState(!getSystemPreference());

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      setDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
