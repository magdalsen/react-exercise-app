
import style from "./Order.module.css";

export interface OrderProps {
  id:number;
  title:string,
  amount:number,
  orderOwner:string,
  ownerId:number,
  phoneNumber:string
}

export const Order = ({id, title, amount, orderOwner, phoneNumber}:OrderProps) => {
    return (
        <>
          <div className={style.card}>
            <div>
                <div>Order id: {id}</div>
                <div>Name: {title}</div>
                <div>Amount: {amount}</div>
                <div>Who ordered: {orderOwner}</div>
                <div>Phone: {phoneNumber}</div>
            </div>
          </div>
        </>
    )
}