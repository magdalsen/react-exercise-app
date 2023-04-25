import { confirmAlert } from 'react-confirm-alert';
import { Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useMutation,useQuery,useQueryClient } from '@tanstack/react-query'

import { deletePerson,getClientById } from "../../../api/clients";

import style from "./CardDetails.module.css";

const CardDetails = () => {
    const { id } = useParams();
    const queryClient= useQueryClient()

    const mutation = useMutation(async (id:string)=>await deletePerson(id), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['clients',id] });
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
                onClick: () => mutation.mutate(id)
              },
              {
                label: 'No',
                onClick: () => alert('Client not deleted.')
              }
            ]
          });
          
     }

     const {data,isLoading,error}=useQuery(['clients',id],()=>{
      if(id)
      return getClientById(id)
    },{
      enabled: !!id
     });
     
     if(error || !id || !data){
       return <p>Cannot get client</p>
     }

     if (isLoading) {
       return <p>Loading...</p>;
     }

    return (
        <div>
            Informacje o wizytówce:
            <div>Id: {id}</div>
            <div>
                <div className={style.dot}><img src={data?.imgSrc} alt="avatar" className={style.avatar} /></div>
                <div>Imię: {data?.name}</div>
                <div>Nazwisko: {data?.surname}</div>
                <div>Ulica: {data?.street}</div>
                <div>Kod pocztowy: {data?.postCode}</div>
                <div>Miasto: {data?.town}</div>
                <div>Województwo: {data?.subRegion}</div>
                <div>Numer telefonu: {data?.phoneNumber}</div>
            </div>
            <div>
                <Link to={`/clients/${id}/edit`}>
                    <button type="button">Edit</button>
                </Link>
                <button type="button" onClick={()=>handleDelete(id)}>Delete</button>
                <Link to="/clients">
                    <button type="button">Back</button>
                </Link>
            </div>
        </div>
    )
}

export default CardDetails