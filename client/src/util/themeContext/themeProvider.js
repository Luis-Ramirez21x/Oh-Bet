

import { useState, useEffect } from "react";

import { ThemeContext } from './themeContext'


export const ThemeProvider = ({ children }) => {
    const [darkMode , setMode] = useState(
        localStorage.getItem('dark-mode') === 'true'
      )
    
      useEffect(() =>{
        localStorage.setItem('dark-mode', darkMode)
      },[darkMode])
    
      const toggleDarkMode = () => {
        setMode(!darkMode);
      }
    

    return (
        <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
            { children }
        </ThemeContext.Provider>
    );
}