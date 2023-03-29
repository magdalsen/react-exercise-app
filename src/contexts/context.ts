
import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"

export const useThemeContext=()=>{
    const ctx=useContext(ThemeContext)

    if(!ctx){ // poza komponentem zwróci nulla
        throw new Error("Missing themeContext, it's not wrapped in ThemeProvider")
    }
    return ctx
}