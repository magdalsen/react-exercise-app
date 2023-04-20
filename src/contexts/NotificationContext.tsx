import { createContext } from "react";
import { toast, ToastContainer } from "react-toastify";

import { getSafeContext } from "./getSafeContext";

import 'react-toastify/dist/ReactToastify.css';

type NotificationProviderType = {
    // alertText: string,
    // setAlertText: Dispatch<SetStateAction<string>>,
    toggleAlert: (alert:string)=>Promise<boolean>
}

const toastConfig = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
}

export const NotificationContext=createContext<NotificationProviderType|null>(null)

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {

  const toggleAlert = async (alert:string) => {
    if(confirm('Are you sure?')) {
        toast.success(alert, {...toastConfig, theme: "colored"});
        return true;
      } else {
        toast.error('Exit', {...toastConfig, theme: "colored"});
        return false;
      }
  }

    return (
      <NotificationContext.Provider value={{
        toggleAlert
      }}>
        {children}
        <ToastContainer />
      </NotificationContext.Provider>
    );
  };

  
  export const useNotificationContext=getSafeContext(NotificationContext, "notificationContext")