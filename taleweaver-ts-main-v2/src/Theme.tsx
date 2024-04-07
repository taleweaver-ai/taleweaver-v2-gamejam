"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const getToggledTheme = (theme: string) => {
  return theme === "light" ? "dark" : "light";
}

const addThemeAttribute = (theme: string) => {
  // Add theme attribute to html element 
  // so Bootstrap can style components accordingly
  const html = document.querySelector("html")!;
  html.setAttribute("data-bs-theme", theme);
  // Set theme class to html element 
  // so custom css can style components accordingly
  html.classList.add("theme-" + theme);
  const toggledTheme = getToggledTheme(theme);
  html.classList.remove("theme-" + toggledTheme);
}

export const ThemeContext = createContext({
  theme: "dark",
  setTheme: (theme: string) => {
    addThemeAttribute(theme);
  },
  toggleTheme: (theme: string) => {
    addThemeAttribute(getToggledTheme(theme));
  }
});

interface ProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ProviderProps) => {
  const context = useContext(ThemeContext);
  const [theme, setThemeState] = useState(context.theme);
  const setTheme = (theme: string) => {
    setThemeState(theme);
    addThemeAttribute(theme);
  }
  const toggleTheme = (theme: string) => {
    const toggledTheme = getToggledTheme(theme);
    setTheme(toggledTheme);
  }
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
