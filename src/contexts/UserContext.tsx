import { createContext, useState } from "react"

import { supabase } from "../supabaseClient";

import { getSafeContext } from "./getSafeContext";
import { useNotificationContext } from "./NotificationContext";

type UserContextProps={
    login: (username:string,password:string)=>void;
    loginData: (username:string,password:string)=>Promise<boolean | undefined>;
    logOut: ()=>void;
    isLoggedIn:boolean;
    image: string | null;
    email: string | null;
}

export const UserContext=createContext<UserContextProps|null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn,setIsLogged]=useState<boolean>(false)
  const {toggleAlert}=useNotificationContext();
  const [image, setImage] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>('');

  async function getProfile(email:string) {
    const { data:image } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);
    setImage(image[0].image);
    return image[0].image;
  }

  const loginData = async (username:string,password:string) => {
    const { data,error } = await supabase.auth.signInWithPassword({ 
      email: username,
      password: password
     });
     if (error) {
      if (await toggleAlert("Bad data!")===false) {
        setIsLogged(false);
        return false
      }
      return
    }
     if (data) {
      if (await toggleAlert("Logged in!")===true) {
        setIsLogged(true);
        await getProfile(data.user?.email);
        setEmail(data.user?.email);
        return true;
      }
     }
  }

  const login= (username:string,password:string)=>{
    loginData(username,password);
  }

  const logOut=async()=>{
     setIsLogged(false);
     const { error } = await supabase.auth.signOut();
     if (error) {
      throw error
     }
  }

    return (
      <UserContext.Provider value={{ image,email, login,logOut,loginData, isLoggedIn}}>
        {children}
      </UserContext.Provider>
    );
  };

  
  export const useUserContext=getSafeContext(UserContext, "userContext")