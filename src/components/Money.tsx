import { Link } from "react-router-dom";
import { InputLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import {InferType} from "yup";
import * as yup from "yup";

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { decrementByAmount, incrementByAmount } from '../redux/moneySlice';

import LoginWrapper from "./LoginWrapper";

import style from "./Login/FakeLoginComponent.module.css";

const yupSchema=yup.object({
    money: yup.number()
        .moreThan(0)
        .required('Money value required!')
  })
  
  export type FormValues = InferType<typeof yupSchema>;

const Money = () => {
    const moneySlice = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

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
                    <div>
                        <InputLabel htmlFor="money">Money:</InputLabel>
                        <div className={style.moneyValue}>{moneySlice} $</div>
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
                            onClick={() => dispatch(decrementByAmount(formik.values.money))} >
                                Decrease
                        </button>
                        <button 
                            type="submit" 
                            onClick={() => dispatch(incrementByAmount(formik.values.money))} >
                                Increase
                        </button>
                    </div>
                </form>
            </LoginWrapper>
            <Link to="/">
                <button type="button">Back</button>
            </Link>
        </>
    )
}

export default Money