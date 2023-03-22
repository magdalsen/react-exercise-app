import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup"
import {InferType} from "yup"
import style from "../Cards/CardForm/CardForm.module.css"

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

export const FakeRegisterComponent = () => {
    const [client, setClient] = useState<FormValues[]>([]);

    const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      surname: "",
      login: "",
      password: "",
      confirm: ""
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
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <p style={{ color: "red" }}>{formik.errors.name}</p>
            </div>
            <div>
                <label htmlFor="surname">Surname</label>
                <input
                    type="text"
                    id="surname"
                    name="surname"
                    onChange={formik.handleChange}
                    value={formik.values.surname}
                />
                <p style={{ color: "red" }}>{formik.errors.surname}</p>
            </div>
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
            <div>
                <label htmlFor="confirm">Confirm password</label>
                <input
                    type="password"
                    id="confirm"
                    name="confirm"
                    onChange={formik.handleChange}
                    value={formik.values.confirm}
                />
                <p style={{ color: "red" }}>{formik.errors.confirm}</p>
            </div>
            <button type="submit">Register</button>
            <Link to="/">
                <button type="button">Back</button>
            </Link>
        </form>
    </>
  )
}
