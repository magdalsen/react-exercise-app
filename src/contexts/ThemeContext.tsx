import { createContext, Dispatch, SetStateAction, useEffect,useState } from "react"

import { getSafeContext } from "./getSafeContext"

type ThemeContextType={
  isDarkTheme: boolean,
  setIsDarkTheme: Dispatch<SetStateAction<boolean>>
  toggleTheme: ()=>void;
}

export const ThemeContext=createContext<ThemeContextType|null>(null)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
      setIsDarkTheme(prev=>!prev);
    }

    useEffect(() => {
      if(isDarkTheme){
        document.body.style.backgroundColor = "black", document.body.style.color = "#fff"
      }else{
        document.body.style.backgroundColor = "#fff", document.body.style.color = "black"
      }

    }, [isDarkTheme])
    
    return (
      <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme,toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };

  export const useThemeContext=getSafeContext(ThemeContext, "themeContext")