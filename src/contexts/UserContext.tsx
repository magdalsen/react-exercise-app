import { Dispatch, SetStateAction, createContext, useState } from "react"
import { getSafeContext } from "./getSafeContext";

type User = {
      name: string;
      surname: string;
      login: string;
      password: string;
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

  const addUser=(user:User)=>{
    setUsers(prev=>[...prev, user]);
  }

  const login=(username:string,password:string)=>{
    const currentUser=users.find(user=>user.login===username)
    if(currentUser && currentUser.password===password){
      setIsLogged(true)
      return true;
    }
    return false;
  }

  const logOut=()=>{
     setIsLogged(false)
  }

    return (
      <UserContext.Provider value={{ users, addUser, login,logOut, isLoggedIn}}>
        {children}
      </UserContext.Provider>
    );
  };

  
  export const useUserContext=getSafeContext(UserContext, "userContext")