import { Link} from "react-router-dom";
import style from "./CardDetails.module.css";
import { useParams } from "react-router-dom";
import { CardProps } from "../Cards";
import { useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query'
import { deletePerson,getClientById } from "../../../api/clients";

const CardDetails = () => {
    const { id } = useParams();
    const queryClient= useQueryClient()

    const mutation = useMutation(async (id:string)=>{return await deletePerson(id)}, {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
      onError: ()=>{
        throw new Error("Something went wrong :(");
      }
    });

    useEffect(()=>{
      mutation2.mutate(data)
    }, [])

    const mutation2 = useMutation(async (id:string)=>{return await getClientById(id)}, {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
      onError: ()=>{
        throw new Error("Something went wrong :(");
      }
    });


    const handleDelete = async (id:string) => {
        confirmAlert({
            title: 'Confirm to delete Client',
            message: 'Are you sure to do this?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {return mutation.mutate(id)}
              },
              {
                label: 'No',
                onClick: () => {return alert('Client not deleted.')}
              }
            ]
          });
          
     }

     const {data,isLoading,error}=useQuery(['client',id],()=>{
      if(id)
      return getClientById(id)
    },{
      enabled: !!id
     });
     
     if(error || !id){
       return <p>Cannot get orders</p>
     }

     if (isLoading) {
       return <p>Loading...</p>;
     }

    return (
        <div>
            Informacje o wizytówce:
            <div>Id: {id}</div>
            <div>
                <div className={style.dot}><img src={data.imgSrc} alt="avatar" className={style.avatar} /></div>
                <div>Imię: {data.name}</div>
                <div>Nazwisko: {data.surname}</div>
                <div>Ulica: {data.street}</div>
                <div>Kod pocztowy: {data.postCode}</div>
                <div>Miasto: {data.town}</div>
                <div>Województwo: {data.subRegion}</div>
                <div>Numer telefonu: {data.phoneNumber}</div>
            </div>
            <div>
                <Link to={`/clients/${id}/edit`}>
                    <button type="button">Edit</button>
                </Link>
                <button type="button" onClick={()=>{return handleDelete(id)}}>Delete</button>
                <Link to="/clients">
                    <button type="button">Back</button>
                </Link>
            </div>
        </div>
    )
}

export default CardDetails