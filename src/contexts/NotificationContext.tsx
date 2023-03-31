import { Dispatch, SetStateAction, createContext, useState } from "react";
import { getSafeContext } from "./getSafeContext";

type NotificationProviderType = {
    alertText: string,
    setAlertText: Dispatch<SetStateAction<string>>,
    toggleAlert: ()=>void
}

export const NotificationContext=createContext<NotificationProviderType|null>(null)

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [alertText, setAlertText] = useState('');

  const toggleAlert = () => {
    if(confirm('Are you sure?')) {
        alert(alertText)
      } else {
        setAlertText('Exiting');
        alert('Exiting');
      }
  }

    return (
      <NotificationContext.Provider value={{
        alertText,
        setAlertText,
        toggleAlert
      }}>
        {children}
      </NotificationContext.Provider>
    );
  };

  
  export const useNotificationContext=getSafeContext(NotificationContext, "notificationContext")