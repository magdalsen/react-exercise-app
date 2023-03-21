import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardProps } from '../Cards/Cards'
import { Wrapper } from '../Wrapper'

const Clients = () => {
   // const [client, setClient] = useState<CardProps[]>([]);
    const queryClient = useQueryClient();
    const [currentCards, setCurrentCards] = useState<CardProps[]>([]);
    

    const fetchFn = async () => {
      const response = await fetch('http://localhost:8000/clients');
      const res = await response.json();
      const data = await res;
     // setClient(data);
      return data as CardProps[];
    }
    const {data:clients, isLoading, error}=useQuery(["clients"],fetchFn);

    useEffect(()=>{
      setCurrentCards(clients || [])
    },[clients])


    // const mutation = useMutation(async ()=>{return await fetchFn()}, {
    //   onSuccess: () => {
    //     queryClient.invalidateQueries(["clients"]);
    //   },
    //   onError: () => {
    //     throw new Error("Something went wrong :(");
    //   }
    // });

    // useEffect(() => {
    //   mutation.mutate(client);
    // }, []);

   

    const filterFn = (e:string) => {
        if(e===""){
          setCurrentCards(clients || [])
        }else{
          const newCards=clients?.filter((el) => {
            let equal = (e === el.name + ' ' + el.surname);
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
    </div>

  )
}

export default Clients

