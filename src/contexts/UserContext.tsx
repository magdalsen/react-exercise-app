import { createContext, useState } from "react"

import { supabase } from "../supabaseClient";

import { getSafeContext } from "./getSafeContext";
import { useNotificationContext } from "./NotificationContext";

export type User = {
      name: string;
      surname: string;
      email: string;
      password: string;
      image: string;
    }

type UserContextProps={
    users: User[],
    addUser: (user:User)=>void;
    login: (username:string,password:string)=>boolean
    logOut: ()=>void;
    isLoggedIn:boolean;
}

export const UserContext=createContext<UserContextProps|null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn,setIsLogged]=useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([]);
  const {setAlertText}=useNotificationContext();
  const [image, setImage] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const addUser=(user:User)=>{
    setUsers(prev=>[...prev, user]);
  }

  async function getProfile() {
    const { data:user } = await supabase
    .from('users')
    .select('*')

    const { data:image } = await supabase
    .from('users')
    .select('*')
    .eq('id', user[0].id);
    setImage(image[0].image);
    return image[0].image;
  }

  const loginData = async (username:string,password:string) => {
    const { data,error } = await supabase.auth.signInWithPassword({ 
      email: username,
      password: password
     });
     if (error) {
        setIsLogged(false);
        setAlertText('Register first!');
        return false
     }
     await getProfile();
     const { data: { user } } = await supabase.auth.getUser();
     setEmail(user?.email);
  }

  const login=(username:string,password:string)=>{
    loginData(username,password)
    setIsLogged(true);
    setAlertText('Logged in!');
    return true;
    
    // const currentUser=users.find(user=>user.email===username)
    // if(currentUser && currentUser.password===password){
    //   if(alertText === '') {
    //     setIsLogged(false);
    //     setAlertText(''); //reset 'Exiting'
    //     return false
    //   } else {
    //     setIsLogged(true);
    //     setAlertText('Logged in!');
    //     return true;
    //   }
    // }
    // setAlertText('Register first!');
    // return false;
  }

  const logOut=async()=>{
     setIsLogged(false);
     const { error } = await supabase.auth.signOut();
     if (error) {
      throw error
     }
  }

    return (
      <UserContext.Provider value={{ image,email,users, addUser, login,logOut, isLoggedIn}}>
        {children}
      </UserContext.Provider>
    );
  };

  
  export const useUserContext=getSafeContext(UserContext, "userContext")