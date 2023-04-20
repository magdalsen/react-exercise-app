import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addInvoiceElement, removeInvoiceElementById } from '../../redux/orderSlice'
import { supabase } from '../../supabaseClient'
import LoginWrapper from '../LoginWrapper'
import { Order, OrderProps } from '../Orders/Order'
import { Wrapper } from '../Wrapper'

import style from "./Orders.module.css"

const Orders = () => {
  const queryClient = useQueryClient();
  const markedOrders=useAppSelector(state=>state.invoice.orders)
  const dispatch = useAppDispatch();

      const fetchFn = async () => {
        const { data: orders } = await supabase
        .from('orders')
        .select('*')
        const { data: clients } = await supabase
        .from('clients')
        .select('*')
        
        return {orders,clients};
      }
      const {data, isLoading, error}=useQuery(['orders', 'clients'],fetchFn);

      const mutation = useMutation(async ()=>await fetchFn(), {
        onSuccess: () => {
          queryClient.invalidateQueries(["orders", "clients"]);
        },
        onError: () => {
          throw new Error("Something went wrong :(");
        }
      });
  
      useEffect(() => {
        if (data) {
          mutation.mutate(data?.orders, data?.clients);
        }
      }, []);

      const handleTick=(e:React.ChangeEvent<HTMLInputElement>, el: OrderProps) => {
        e.target.checked ? dispatch(addInvoiceElement({id: el.id, title: el.title})) : dispatch(removeInvoiceElementById(el.id))
      }

      if(error){
        return <p>Cannot get orders</p>
      }
      if (isLoading) {
        return <p>Loading...</p>;
      }

  return (
    <LoginWrapper>
     <div>
        <Wrapper>
            {data?.orders?.map((el) => (
              <div key={el.id}>
                {data?.clients?.map((el2)=>{
                  const isMarked=!!markedOrders.find(el2=>el.id===el2.id)
                  return <div key={el2.id} className={(Number(el2.id) === Number(el.ownerId) ? '' : style.dispNone)}>
                    <Order 
                      id={el.id} 
                      title={el.title} 
                      amount={el.amount} 
                      orderOwner={Number(el2.id) === Number(el.ownerId) ? `${el2.name} ${el2.surname}` : ''} 
                      ownerId={el.ownerId} phoneNumber={el.phoneNumber} 
                      payed={false} />
                    <div>
                      <input type="checkbox" id="orderInvoice" name="orderInvoice" onChange={(e)=>handleTick(e,el)} checked={isMarked}/>
                      <label htmlFor="orderInvoice">Add to invoice</label>
                  </div>
                  </div>
                })}
                <Link to={`/orders/${el.id}`}>
                  <button type="button">Details</button>
                </Link>
              </div>
            ))}
        </Wrapper>
    </div>
    </LoginWrapper>
  )
}

export default Orders

