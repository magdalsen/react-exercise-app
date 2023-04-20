import { useState } from "react";
import { InputLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import {InferType} from "yup";
import * as yup from "yup";

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { decrementByAmount } from '../../redux/moneySlice';
import { supabase } from "../../supabaseClient";
import LoginWrapper from "../LoginWrapper";

import style from "../Login/FakeLoginComponent.module.css";

const yupSchema=yup.object({
    money: yup.number()
        .moreThan(0)
        .required('Money value required!')
  })
  
  export type FormValues = InferType<typeof yupSchema>;

const InvoicesForm = () => {
    const orderSlice = useAppSelector((state) => state.invoice);
    const dispatch = useAppDispatch();
    const [clicked, setClick] = useState<boolean>(false)

    const updateOrders = (values:boolean) => {    
        orderSlice.orders.map(async (el)=>{
            const { data:data } = await supabase
            .from('orders')
            .select('*')
            .eq('id', el.id)
            const { data:data2 } = await supabase
            .from('orders')
            .update({...data[0], "payed": values})
            .eq('id', el.id)
            return data2;
        })
    }

    const handleClick = () => {
        updateOrders(true);
        setClick(prev=>!prev);
        dispatch(decrementByAmount(formik.values.money));
    }

    const formik = useFormik<FormValues>({
        initialValues: {
          money: 0,
        },
        onSubmit: (values:FormValues) => {
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