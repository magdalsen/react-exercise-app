
import { useNotificationContext } from "../contexts/NotificationContext";
import { supabase } from "../supabaseClient";

//GET
export const getClientById = async (id:string) => {
    const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    if (error) throw error;
    return data && data[0];
    }

// DELETE
export const deletePerson = async (id:string) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
            const {toggleAlert}=useNotificationContext();
            if (await toggleAlert("Client deleted!")) {
              const { data, error } = await supabase
              .from('clients')
              .delete()
              .eq('id', id)
              if (error) throw error;
              return data;
            }
          }

export const deleteOrder = async (id:string) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const {toggleAlert}=useNotificationContext();
          if (await toggleAlert("Order deleted!")) {
            const { data, error } = await supabase
            .from('orders')
            .delete()
            .eq('id', id)
            if (error) throw error;
            return data;
          }
}