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
      const order =  await response.json();
      const response2 = await fetch(`http://localhost:8000/clients/${order.ownerId}`);
      const client = await response2.json();
      return [order,client];
    }
    const {data,isLoading,error}=useQuery(['orders',id],fetchFn);

    useEffect(()=>{
      mutation.mutate(data && data[0] || [])
    }, [data])

       const mutation = useMutation(async ()=>{return await fetchFn()}, {
        onSuccess: () => {
          queryClient.invalidateQueries(['orders',id]);
        },
        onError: () => {
          throw new Error("Something went wrong :(");
        }
      });

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
                <Link to="/orders">
                    <button type="button">Back</button>
                </Link>
            </div>
        </div>
    )
}