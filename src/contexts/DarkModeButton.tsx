import {useThemeContext} from "./context"
import '../App.css';

export const Button = ()=>{
    const { isDarkTheme, setIsDarkTheme,toggleTheme} = useThemeContext();

  return (
    <>
      <button onClick={toggleTheme}>Dark mode</button>
    </>
  )
}