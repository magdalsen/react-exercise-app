import { useState } from "react";
import { InputLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import {InferType} from "yup";
import * as yup from "yup";

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { decrementByAmount } from '../../redux/moneySlice';
import LoginWrapper from "../LoginWrapper";

import style from "../Login/FakeLoginComponent.module.css";

const yupSchema=yup.object({
    money: yup.number()
        .moreThan(0)
        .required('Money value required!')
  })
  
  export type FormValues = InferType<typeof yupSchema>;

const InvoicesForm = () => {
    const orderSlice = useAppSelector((state) => {return state.invoice});
    const dispatch = useAppDispatch();
    const [clicked, setClick] = useState<boolean>(false)

    const updateOrders = (values:boolean) => {       
        orderSlice.orders.map(async (el:number)=>{
            const response = await fetch(`http://localhost:8000/orders/${el.id}`);
            const data = await response.json();
            const response2 = await fetch(`http://localhost:8000/orders/${el.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...data, "payed": values})
            })
            const data2 = response2.json();
            return data2;
        }) 

    }

    const handleClick = () => {
        setClick(prev=>{return !prev});
        dispatch(decrementByAmount(formik.values.money));
    }

    const formik = useFormik<FormValues>({
        initialValues: {
          money: 0,
        },
        onSubmit: (values:FormValues) => {
            updateOrders(true);
            values.money;
        },
        validationSchema: yupSchema,
      });

    return (
        <>
            <LoginWrapper>
                <form className={style.form} onSubmit={formik.handleSubmit}>
                    {clicked ? <div>Payed!</div> : <>
                        <div className={clicked ? style.disabled : ''}>
                            <div>
                                <InputLabel htmlFor="money">Cost:</InputLabel>
                                <TextField
                                    type="number"
                                    onChange={formik.handleChange}

                                    id="money"
                                    name="money"
                                    value={formik.values.money}
                                    />
                                {formik.errors.money ? (
                                    <p style={{ color: "red" }}>{formik.errors.money}</p>
                                ) : null}
                            </div>
                            <div>
                                <button 
                                    type="submit" 
                                    onClick={handleClick} >
                                        Pay
                                </button>
                            </div>
                        </div>
                    </>}

                </form>
            </LoginWrapper>
        </>
    )
}

export default InvoicesForm