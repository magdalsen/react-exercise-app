import { Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { confirmAlert } from "react-confirm-alert";
import { deleteOrder } from "../../../api/clients";

const OrderDetails = () => {
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

      const mutation2 = useMutation(async (id:string)=>{return await deleteOrder(id)}, {
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
                onClick: () => {return mutation2.mutate(id)}
              },
              {
                label: 'No',
                onClick: () => {return alert('Order not deleted.')}
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
                <button type="button" onClick={()=>{return handleDelete(id)}}>Delete</button>
                <Link to="/orders">
                    <button type="button">Back</button>
                </Link>
            </div>
        </div>
    )
}

export default OrderDetails