import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardProps } from '../Cards'
import { FormValues } from '../Form'
import { Wrapper } from '../Wrapper'

const Clients = () => {
    const [client, setClient] = useState<CardProps[]>([]);
    const [currentCards, setCurrentCards] = useState<CardProps[]>(client);

    const fetchFn = async () => {
      const response = await fetch('http://localhost:8000/clients');
      const res = await response.json();
      if (!res) {
        throw new Error(res.error);
      }
      const data = await res;
      setClient(data);
      return data;
    }
    const {data,isLoading,error}=useQuery(["clients"],fetchFn);
    console.log(data,isLoading);

    const filterFn = (e:string) => {
        if(e===""){
          setCurrentCards(client)
        }else{
          const newCards=client.filter((el) => {
            let equal = (e === el.name + ' ' + el.surname);
            if (e === el.name || e === el.surname || equal){
              return el
            }
          })
          setCurrentCards(newCards);
        }
      };

  return (

     <div>
        <div>
        <label htmlFor="name">Filter:</label>
        <input
            type="text"
            name="name"
            onChange={(e) => filterFn(e.target.value)}
        />
        </div>
        <Wrapper>
            {Object.values(client).map((el) => (
            <Link to={`/clients/${el.id}`} key={el.id}>
                <Card {...el} key={el.id} />
            </Link>
            ))}
        </Wrapper>
    </div>

  )
}

export default Clients

