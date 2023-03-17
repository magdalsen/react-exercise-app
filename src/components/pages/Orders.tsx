import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Order, OrderProps } from '../Order'
import { Wrapper } from '../Wrapper'
import style from "./Orders.module.css"

const Orders = () => {
  const queryClient = useQueryClient();

  const fetchFn = async () => {       
    const response =  await fetch(`http://localhost:8000/orders`)
    const res =  await response.json();
    const data =  await res;        
    return data;
  }
  const {data:data, isLoading, error}=useQuery(['orders'],fetchFn);

      const fetchFn2 = async () => {       
        // const response =  await fetch(`http://localhost:8000/orders`)
        // const res =  await response.json();
        // const data =  await res;        
        // await data.map(async (el: { ownerId: any })=>{
        //   const response2 = await fetch(`http://localhost:8000/clients/${el.ownerId}`);
        //   const res2 = await response2.json();
        //   const data2 = await res2;
        //   return data2;
        // })
        const response2 = await fetch(`http://localhost:8000/clients`);
        const res2 = await response2.json();
        const data2 = await res2;
        return data2;
      }
      const {data:data2}=useQuery(['clients'],fetchFn2);

      const mutation = useMutation(async ()=>{return await fetchFn()}, {
        onSuccess: () => {
          queryClient.invalidateQueries(["orders"]);
        },
        onError: () => {
          throw new Error("Something went wrong :(");
        }
      });
  
      useEffect(() => {
        mutation.mutate(data);
      }, []);

      const mutation2 = useMutation(async ()=>{return await fetchFn2()}, {
        onSuccess: () => {
          queryClient.invalidateQueries(["clients"]);
        },
        onError: () => {
          throw new Error("Something went wrong :(");
        }
      });
  
      useEffect(() => {
        mutation2.mutate(data2);
      }, []);
console.log(data,data2);

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
                {data2.map((el2:any)=>(
                  <div className={(Number(`${el2.id}`) === Number(el.ownerId) ? '' : style.dispNone)}>
                    <Order id={el.id} title={el.title} amount={el.amount} orderOwner={Number(`${el2.id}`) === Number(el.ownerId) ? `${el2.name} ${el2.surname}` : ''} ownerId={el.ownerId} phoneNumber={el.phoneNumber} />
                  </div>
                ))}
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

