import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { supabase } from "../../../src/supabaseClient"
import { Card, CardProps } from '../Cards/Cards'
import LoginWrapper from '../LoginWrapper'
import { Wrapper } from '../Wrapper'

const Clients = () => {
    const queryClient = useQueryClient();
    const [currentCards, setCurrentCards] = useState<CardProps[]>([]);
    
    const fetchFn = async () => {
      const { data: data, error } = await supabase
        .from('clients')
        .select('*')
        if (error) throw error;
        return data;
    }
    const {data:clients, isLoading, error}=useQuery(["clients"],fetchFn);

    useEffect(()=>{
      setCurrentCards(clients || []);
      mutation.mutate(clients || []);
    },[clients])


    const mutation = useMutation(async ()=>await fetchFn(), {
      onSuccess: () => {
        queryClient.invalidateQueries(["clients"]);
      },
      onError: () => {
        throw new Error("Something went wrong :(");
      }
    });   

    const filterFn = (e:string) => {
        if(e===""){
          setCurrentCards(clients || [])
        }else{
          const newCards=clients?.filter((el) => {
            const equal = (e === el.name + ' ' + el.surname);
            if (e === el.name || e === el.surname || equal){
              return el
            }
          })
          setCurrentCards(newCards || []);
        }
      };

   if(error || !clients || !currentCards){
      return <p>Cannot get data</p>
    }
    if (isLoading) {
      return <p>Loading...</p>;
    }

  return (
     <div>
      <LoginWrapper>
        <div>
          <label htmlFor="name">Filter:</label>
          <input
              type="text"
              name="name"
              onChange={(e) => filterFn(e.target.value)}
          />
        </div>
        <Wrapper>
            {currentCards.map((el: CardProps) => (
            <Link to={`/clients/${el.id}`} key={el.id}>
                <Card {...el} key={el.id} />
            </Link>
            ))}
        </Wrapper>
      </LoginWrapper>
    </div>
  )
}

export default Clients

