import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Order, OrderProps } from '../Order'
import { Wrapper } from '../Wrapper'

const Orders = () => {
  const queryClient = useQueryClient();

      const fetchFn2 = async () => {       
        const response =  await fetch(`http://localhost:8000/orders`)
        const res =  await response.json();
        const data =  await res;        
        // await data.map(async (el: { ownerId: any })=>{
        //   const response2 = await fetch(`http://localhost:8000/clients/${el.ownerId}`);
        //   const res2 = await response2.json();
        //   const data2 = await res2;
        //   return data2;
        // })
        const response2 = await fetch(`http://localhost:8000/clients`);
        const res2 = await response2.json();
        const data2 = await res2;
        return data;
      }
      
      const {data:data, isLoading, error}=useQuery(['clients', 'orders'],fetchFn2);
      console.log(data);


      const mutation = useMutation(async ()=>{return await fetchFn2()}, {
        onSuccess: () => {
          queryClient.invalidateQueries(["clients", "orders"]);
        },
        onError: () => {
          throw new Error("Something went wrong :(");
        }
      });
  
      useEffect(() => {
        mutation.mutate(data);
      }, []);

      if(error){
        return <p>Cannot get orders</p>
      }
      if (isLoading) {
        return <p>Loading...</p>;
      }

  return (
     <div>
        <Wrapper>
            {data.map((el: OrderProps) => (
              <div key={el.id}>
                <Order {...el} />
                <Link to={`/orders/${el.id}`}>
                  <button type="button">Details</button>
                </Link>
              </div>
            ))}
        </Wrapper>
    </div>
  )
}

export default Orders

