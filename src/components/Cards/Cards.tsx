import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import style from "./Card.module.css";
import { CardDetails } from "./CardDetails/CardDetails";

export interface CardProps {
  id:number;
  imgSrc:string,
  name:string,
  surname:string,
  street:string,
  postCode:string,
  town:string,
  subRegion:string,
  phoneNumber:string
}

export const Card = ({imgSrc, name, surname, street, postCode, town, phoneNumber}:CardProps) => {
    return (
        <>
          <div className={style.card}>
            <div className={style.dot}><img src={imgSrc} className={style.avatar} alt="avatar" /></div>
            <div>
                <div>{name} {surname}</div>
                <div>Adres: </div>
                <div>{street}, {postCode}</div>
                <div>{town}</div>
                <div>Tel. {phoneNumber}</div>
            </div>
          </div>
        </>
    )
}