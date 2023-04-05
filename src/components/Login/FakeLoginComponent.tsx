import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {InferType} from "yup";

import { useNotificationContext } from "../../contexts/NotificationContext";
import { useUserContext } from "../../contexts/UserContext";

import { FormInput } from "./FormInputLogin";

import style from "../Cards/CardForm/CardForm.module.css";


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
    const {users, login,logOut,isLoggedIn}=useUserContext();
    const {toggleAlert}=useNotificationContext();

    const formik = useFormik<FormValues>({
    initialValues: {
      login: "",
      password: ""
    },
    onSubmit: (values:FormValues) => {
      if (!isLoggedIn) login(values.login,values.password);
    },
    validationSchema: yupSchema,
  });
// console.log(users);

  return (
    <>
        <form className={style.form} onSubmit={formik.handleSubmit}>
          {isLoggedIn ? <>
                          <p>You are logged in {users[0].login}</p>
                          <button type="button" onClick={logOut}>Logout</button>
                        </> : <>
            <FormInput formik={formik} accessor='login' />
            <FormInput formik={formik} accessor='password' />
            <button type="submit" onClick={toggleAlert}>Login</button>
          </>}
          <Link to="/register">
            <button type="button">Register</button>
          </Link>
        </form>
    </>
  )
}

export default FakeLoginComponent