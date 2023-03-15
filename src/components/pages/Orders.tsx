import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Order, OrderProps } from '../Order'
import { Wrapper } from '../Wrapper'

const Orders = () => {
    const [order, setOrder] = useState<OrderProps[]>([]);
    
    useEffect(() => {
        fetch('http://localhost:8000/orders')
          .then(res => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setOrder(data);
          })
      }, []);

  return (
     <div>
        <Wrapper>
            {Object.values(order).map((el) => (
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

