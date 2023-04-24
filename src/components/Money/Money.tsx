import { Link } from "react-router-dom";
import { InputLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import {InferType} from "yup";

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { decrementByAmount, incrementByAmount } from '../../redux/moneySlice';
import LoginWrapper from "../LoginWrapper/LoginWrapper";
import { yupSchemaMoney } from "../validations/validations";

import style from "../Login/FakeLoginComponent.module.css";
  
export type FormValues = InferType<typeof yupSchemaMoney>;

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
        validationSchema: yupSchemaMoney,
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