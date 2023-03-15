import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup"
import {InferType} from "yup"
import { FakeRegisterComponent } from "./FakeRegisterComponent";
import style from "./Form.module.css"

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

export const FakeLoginComponent = () => {
    const [client, setClient] = useState<FormValues[]>([]);

    const formik = useFormik<FormValues>({
    initialValues: {
      login: "",
      password: ""
    },
    onSubmit: (values:FormValues) => {
        setClient(()=>[{...values}]);
        alert(`Client ${values.login} ${values.password} logged in!`);
    },
    validationSchema: yupSchema,
  });

  return (
    <>
        <form className={style.form} onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="login">Login</label>
                <input
                    type="text"
                    id="login"
                    name="login"
                    onChange={formik.handleChange}
                    value={formik.values.login}
                />
                {formik.touched.login && formik.errors.login ? (
                <p style={{ color: "red" }}>{formik.errors.login}</p>
                ) : null}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <p style={{ color: "red" }}>{formik.errors.password}</p>
            </div>
            <button type="submit">Login</button>
            <Link to="/register">
                  <button type="button">Register</button>
            </Link>
        </form>
    </>
  )
}
