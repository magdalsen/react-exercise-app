import { Link } from "react-router-dom";
import { useFormik } from "formik";
import {InferType} from "yup";

import { useUserContext } from "../../contexts/UserContext";
import { useAppSelector } from '../../redux/hooks';
import { yupSchemaFakeLogin } from "../validations/validations";

import { FormInput } from "./FormInputLogin";

import style from "./FakeLoginComponent.module.css";

export type FormValues = InferType<typeof yupSchemaFakeLogin>;

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
    validationSchema: yupSchemaFakeLogin,
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