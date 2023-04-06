import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {InferType} from "yup";

import { useNotificationContext } from "../../contexts/NotificationContext";
import { useUserContext } from "../../contexts/UserContext";
import { useAppSelector } from '../../redux/hooks';

import { FormInput } from "./FormInputLogin";

import style from "./FakeLoginComponent.module.css";

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
    const moneySlice = useAppSelector((state) => {return state.counter.value});


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

  return (
    <>
        <form className={style.form} onSubmit={formik.handleSubmit}>
          {isLoggedIn ? <>
                          <div><p>You are logged in {users[0].login}</p></div>
                          <div className={style.avatarBox}>
                            <img src={users[0].image} alt="avatar" />
                            <Link to="/money" className={style.moneyValue}>
                              <span>{moneySlice} $</span>
                            </Link>
                          </div>
                          <div><button type="button" onClick={logOut}>Logout</button></div>
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