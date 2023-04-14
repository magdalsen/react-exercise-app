//GET
import { supabase } from "../supabaseClient";

export const getClientById = async (id:string) => {
  // let { data: clients, error } = await supabase
  //   .from('clients')
  //   .select('id')

    const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    
    return data && data[0];
      // const response =  await fetch(`http://localhost:8000/clients/${id}`)
      // const data =  await response.json();
      // return data;
    }

// DELETE
export const deletePerson = async (id:string) => {
            alert('Client deleted!');
            
            const { data, error } = await supabase
            .from('clients')
            .delete()
            .eq('id', id)
            if (error) {
              throw error;
            }
            // const response = await fetch(`http://localhost:8000/clients/${id}`, {
            //     method: "DELETE",
            // })
            //   const data = await response.json();
              return data;
          }

export const deleteOrder = async (id:string) => {
            alert('Order deleted!');

            const { data, error } = await supabase
            .from('orders')
            .delete()
            .eq('id', id)
            if (error) {
              throw error;
            }
            // const response = await fetch(`http://localhost:8000/orders/${id}`, {
            //     method: "DELETE",
            // })
            // const data = await response.json();
              return data;
}