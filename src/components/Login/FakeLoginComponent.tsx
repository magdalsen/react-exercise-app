import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {InferType} from "yup";

import { useUserContext } from "../../contexts/UserContext";
import { useAppSelector } from '../../redux/hooks';

import { FormInput } from "./FormInputLogin";

import style from "./FakeLoginComponent.module.css";

const yupSchema=yup.object({
  email: yup.string().email('Invalid email').required('E-mail required!'),
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
    const {image,email,login,logOut,isLoggedIn}=useUserContext();
    
    const moneySlice = useAppSelector((state) => state.counter.value);

    const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (values:FormValues) => {
      if (!isLoggedIn) login(values.email,values.password);
    },
    validationSchema: yupSchema,
  });

  return (
    <>
        <form className={style.form} onSubmit={formik.handleSubmit}>
          {isLoggedIn ? <>
                          <div><p>You are logged in {email}</p></div>
                          <div className={style.avatarBox}>
                            <img src={image} alt="avatar" />
                            <Link to="/money" className={style.moneyValue}>
                              <span>{moneySlice} $</span>
                            </Link>
                          </div>
                          <div><button type="button" onClick={logOut}>Logout</button></div>
                        </> : <>
            <FormInput formik={formik} accessor='email' />
            <FormInput formik={formik} accessor='password' />
            <button type="submit">Login</button>
          </>}
          <Link to="/register">
            <button type="button" onClick={logOut}>Register</button>
          </Link>
        </form>
    </>
  )
}

export default FakeLoginComponent