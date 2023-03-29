import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import * as yup from "yup"
import {InferType} from "yup"
import style from "../Cards/CardForm/CardForm.module.css"
import { FormInput } from "./FormInputLogin";


const yupSchema=yup.object({
  login: yup.string().email('Invalid email').required('E-mail required!'),
  password: yup.string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .required('Password required!')
})

export type FormValues = InferType<typeof yupSchema>;

const FakeLoginComponent = () => {
    const {login}=useUserContext()


    const formik = useFormik<FormValues>({
    initialValues: {
      login: "",
      password: ""
    },
    onSubmit: (values:FormValues) => {
        login(values.login,values.password)
        alert(`Client ${values.login} logged in!`);
    },
    validationSchema: yupSchema,
  });

  return (
    <>
        <form className={style.form} onSubmit={formik.handleSubmit}>
            <FormInput formik={formik} accessor='login' />
            <FormInput formik={formik} accessor='password' />
            <button type="submit">Login</button>
            <Link to="/register">
                  <button type="button">Register</button>
            </Link>
        </form>
    </>
  )
}

export default FakeLoginComponent