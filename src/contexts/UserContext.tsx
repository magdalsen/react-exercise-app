import { createContext, useState } from "react"

import { getSafeContext } from "./getSafeContext";
import { useNotificationContext } from "./NotificationContext";

type User = {
      name: string;
      surname: string;
      login: string;
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
  const {alertText,setAlertText}=useNotificationContext();

  const addUser=(user:User)=>{
    setUsers(prev=>{return [...prev, user]});
  }

  const login=(username:string,password:string)=>{
    const currentUser=users.find(user=>{return user.login===username})
    if(currentUser && currentUser.password===password){
      if(alertText === '') {
        setIsLogged(false);
        setAlertText(''); //reset 'Exiting'
        return false
      } else {
        setIsLogged(true);
        setAlertText('Logged in!');
        return true;
      }
    }
    setAlertText('Register first!');
    return false;
  }

  const logOut=()=>{
     setIsLogged(false);
  }

    return (
      <UserContext.Provider value={{ users, addUser, login,logOut, isLoggedIn}}>
        {children}
      </UserContext.Provider>
    );
  };

  
  export const useUserContext=getSafeContext(UserContext, "userContext")