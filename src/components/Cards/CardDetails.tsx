import { Link} from "react-router-dom";
import style from "./CardDetails.module.css";
import { useParams } from "react-router-dom";
import { CardProps } from "./Cards";
import { useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useQuery } from '@tanstack/react-query'

export const CardDetails = () => {
    const { id } = useParams();
    const [client, setClient] = useState<CardProps[]>([]);

    const handleDelete = async () => {
        confirmAlert({
            title: 'Confirm to delete Client',
            message: 'Are you sure to do this?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => deletePerson()
              },
              {
                label: 'No',
                onClick: () => alert('Client not deleted.')
              }
            ]
          });
          const deletePerson = async () => {
            alert('Client deleted!');
            const response = await fetch(`http://localhost:8000/clients/${id}`, {
                method: "DELETE",
                  headers: { "Content-type": "application/json;charset=UTF-8" },
                  body: JSON.stringify(client)
            })
              const data = await response.json();
              return data;
          }
     }

     const fetchFn = async () => {
      const response =  await fetch(`http://localhost:8000/clients/${id}`)
      const res =  await response.json();
      const data =  await res;
      setClient(data);
      return data;
    }

     const {data,isLoading,error}=useQuery([`clients/${id}`],fetchFn);

     if(error){
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
                <button type="button" onClick={handleDelete}>Delete</button>
                <Link to="/clients">
                    <button type="button">Back</button>
                </Link>
            </div>
        </div>
    )
}