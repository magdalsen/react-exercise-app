import { Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { OrderProps } from "./Order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const OrderDetails = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const fetchFn = async () => {
        const response =  await fetch(`http://localhost:8000/orders/${id}`)
        const res =  await response.json();
        const data =  await res;
        return data;
      }
      const {data,isLoading,error}=useQuery([`orders/${id}`],fetchFn);
    
      const fetchFn2 = async () => {       
        const response =  await fetch(`http://localhost:8000/orders/${id}`)
        const res =  await response.json();
        const data =  await res;
        const response2 = await fetch(`http://localhost:8000/clients/${data.ownerId}`);
        const res2 = await response2.json();
        const data2 = await res2;
        return data2;
      }
      const {data:data2}=useQuery([`clients/${data && data.ownerId}`],fetchFn2);

    useEffect(() => {
        mutation.mutate(data);
      }, []);

       const mutation = useMutation(async ()=>{return await fetchFn()}, {
        onSuccess: () => {
          queryClient.invalidateQueries([`orders/${id}`]);
        },
        onError: () => {
          throw new Error("Something went wrong :(");
        }
      });

      if(error){
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
                <div>Name: {data.title}</div>
                <div>Amount: {data.amount}</div>
                <div>Who ordered: {data2?.name} {data2?.surname}</div>
                <div>Phone: {data.phoneNumber}</div>
            </div>
            <div>
                <Link to={`/clients/${data.ownerId}`}>
                    <button type="button">Show Client</button>
                </Link>
                <Link to="/orders">
                    <button type="button">Back</button>
                </Link>
            </div>
        </div>
    )
}