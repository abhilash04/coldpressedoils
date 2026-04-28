import React, { createContext, useContext, useState } from 'react';
import { createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      text: {
        primary: darkMode ? "#bbbbbb" : "#675a72",
      },
      primary: {
        main: darkMode ? "#FF8C00" : "#FF8C00",
      },
      background: {
        default: darkMode ? "#1d1d1d" : "#000000",
        paper: darkMode ? "#131313" : "#1c191f",
        toolbar:darkMode?"#ffffff" :"#312b36",
        toolbartextfield:darkMode? "#ffffff":"#1c191f",
        homeBackground:darkMode?"#f8f3f7":"#1c191f"
      },
      
    },
  });


  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode); 
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
