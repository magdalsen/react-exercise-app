import { Dispatch, SetStateAction, createContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getSafeContext } from "./getSafeContext";
import 'react-toastify/dist/ReactToastify.css';

type NotificationProviderType = {
    alertText: string,
    setAlertText: Dispatch<SetStateAction<string>>,
    toggleAlert: ()=>void
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
  const [alertText, setAlertText] = useState('');

  const toggleAlert = () => {
    if(confirm('Are you sure?')) {
        toast.success(alertText, {...toastConfig, theme: "colored"});
      } else {
        setAlertText('');
        toast.error('Exit', {...toastConfig, theme: "colored"});
      }
  }

    return (
      <NotificationContext.Provider value={{
        alertText,
        setAlertText,
        toggleAlert
      }}>
        {children}
        <ToastContainer />
      </NotificationContext.Provider>
    );
  };

  
  export const useNotificationContext=getSafeContext(NotificationContext, "notificationContext")