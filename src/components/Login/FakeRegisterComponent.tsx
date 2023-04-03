import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../contexts/context";
import * as yup from "yup"
import {InferType} from "yup"
import style from "../Cards/CardForm/CardForm.module.css"
import { FormInput } from "./FormInputRegister";
import { useUserContext } from "../../contexts/UserContext";
import { useNotificationContext } from "../../contexts/NotificationContext";

const yupSchema=yup.object({
  name: yup.string().min(3, 'Min 3 characters!').required("Name required!"),
  surname: yup.string().min(2, 'Min 2 characters!').required("Surname required!"),
  login: yup.string().email('Invalid email').required('E-mail (login) required!'),
  password: yup
    .string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .required('Password required!'),
  confirm: yup.string()
    .oneOf([yup.ref('password')], 'Must match "password" field value')
    .required('Confirm password required!')
})

export type FormValues = InferType<typeof yupSchema>;

const FakeRegisterComponent = () => {
  const {alertText,setAlertText,toggleAlert}=useNotificationContext();
  
    const {addUser}=useUserContext()
    const addClient = async (values:FormValues) => {
      addUser(values)
        const response = await fetch(`http://localhost:8000/register`, {
          method: "POST",
           headers: {"Content-type": "application/json;charset=UTF-8"},
          body: JSON.stringify(values),
        });
        if (!response.ok) {
          return {};
        }
        const data = await response.json();
        console.log(data);
        return data;
    }

    const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      surname: "",
      login: "",
      password: "",
      confirm: ""
    },
    onSubmit: (values:FormValues) => {
      if (alertText !== '') {
        addClient(values);
        setAlertText(`Client ${values.login} registered!`);
      }
    },
    validationSchema: yupSchema,
  });

  return (
    <>
        <form className={style.form} onSubmit={formik.handleSubmit}>
            <FormInput formik={formik} accessor='name' />
            <FormInput formik={formik} accessor='surname' />
            <FormInput formik={formik} accessor='login' />
            <FormInput formik={formik} accessor='password' />
            <FormInput formik={formik} accessor='confirm' />
            <button type="submit" onClick={toggleAlert}>Register</button>
            <Link to="/">
                <button type="button">Back</button>
            </Link>
        </form>
    </>
  )
}

export default FakeRegisterComponent