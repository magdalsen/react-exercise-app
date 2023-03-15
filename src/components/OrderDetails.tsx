import { Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { OrderProps } from "./Order";

export const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<OrderProps>([]);

    useEffect(() => {
        fetch(`http://localhost:8000/orders/${id}`)
          .then(res => {
            return res.json();
          })
          .then((data) => {
            setOrder(data);
          })
    }, []);

    return (
        <div>
            Informacje o zamówieniu:
            <div>
                <div>Order Id: {id}</div>
                <div>Name: {order.title}</div>
                <div>Amount: {order.amount}</div>
                <div>Who ordered: {order.orderOwner}</div>
                <div>Phone: {order.phoneNumber}</div>
            </div>
            <div>
                <Link to={`/clients/${order.ownerId !== undefined ? order.ownerId[0].id : []}`}>
                    <button type="button">Show Client</button>
                </Link>
                <Link to="/orders">
                    <button type="button">Back</button>
                </Link>
            </div>
        </div>
    )
}