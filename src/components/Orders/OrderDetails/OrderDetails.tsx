import { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteOrder } from "../../../api/clients";
import { supabase } from "../../../supabaseClient";

import 'react-confirm-alert/src/react-confirm-alert.css';

const OrderDetails = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const fetchFn = async () => {
      const { data:order } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      const { data:client, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', order[0].ownerId)
      if (error) throw error;
      return [order[0],client[0]];
    }
    const {data,isLoading,error}=useQuery(['orders',id],fetchFn);

    useEffect(()=>{
      mutation.mutate(data && data[0] || [])
    }, [data])

       const mutation = useMutation(async ()=>await fetchFn(), {
        onSuccess: () => {
          queryClient.invalidateQueries(['orders',id]);
        },
        onError: () => {
          throw new Error("Something went wrong :(");
        }
      });

      const mutation2 = useMutation(async (id:string)=>await deleteOrder(id), {
        onSuccess: () => {
          queryClient.invalidateQueries();
        },
        onError: ()=>{
          throw new Error("Something went wrong :(");
        }
      });

      const handleDelete = async (id:string) => {
        confirmAlert({
            title: 'Confirm to delete Order',
            message: 'Are you sure to do this?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => mutation2.mutate(id)
              },
              {
                label: 'No',
                onClick: () => alert('Order not deleted.')
              }
            ]
          });
     }

     if(error || !data){
      return <p>Cannot get orders</p>
    }
    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
        <div>
            Informacje o zamówieniu:
            <div>
                <div>Order Id: {id}</div>
                <div>Name: {data[0].title}</div>
                <div>Amount: {data[0].amount}</div>
                <div>Who ordered: {data[1].name} {data[1].surname}</div>
                <div>Phone: {data[0].phoneNumber}</div>
            </div>
            <div>
                <Link to={`/clients/${data[0].ownerId}`}>
                    <button type="button">Show Client</button>
                </Link>
                <button type="button" onClick={()=>handleDelete(id)}>Delete</button>
                <Link to="/orders">
                    <button type="button">Back</button>
                </Link>
            </div>
        </div>
    )
}

export default OrderDetails