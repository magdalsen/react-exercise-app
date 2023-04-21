import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup"
import {InferType} from "yup"

import { useNotificationContext } from "../../contexts/NotificationContext";
import { supabase } from "../../supabaseClient";

import { FormInput } from "./FormInputRegister";

import style from "../Cards/CardForm/CardForm.module.css"

const yupSchema=yup.object({
  name: yup.string().min(3, 'Min 3 characters!').required("Name required!"),
  surname: yup.string().min(2, 'Min 2 characters!').required("Surname required!"),
  email: yup.string().email('Invalid email').required('E-mail required!'),
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
    .required('Confirm password required!'),
  // file: yup.object({
  //   file: yup.mixed().required('Avatar required!')
  // }),
  image: yup.string().required("Avatar required!"),
})

export type FormValues = InferType<typeof yupSchema>;

const FakeRegisterComponent = () => {
  const {toggleAlert}=useNotificationContext();

    const addClient = async (values:FormValues) => {
      const { data:user, error } = await supabase.auth.signUp({ 
        email: values.email,
        password: values.password
      })
      if (error) {
        throw error;
      }
      if (user) {
        const { data:userr, error } = await supabase
        .from('users')
        .insert([
          { ...values },
        ])
        if (error) {
          if (await toggleAlert("User already exist! Use different email")===true) return false;
        }
        if (userr) {
          if (await toggleAlert(`Client ${values.email} registered!`)===true) return true;
        }
      }
    }

    const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirm: "",
      image: "https://wallpaper.dog/logob.png",
    },
    onSubmit: async (values:FormValues) => {
      addClient(values);
    },
    validationSchema: yupSchema,
  });

  return (
    <>
        <form className={style.form} onSubmit={formik.handleSubmit}>
            <FormInput formik={formik} accessor='name' />
            <FormInput formik={formik} accessor='surname' />
            <FormInput formik={formik} accessor='email' />
            <FormInput formik={formik} accessor='password' />
            <FormInput formik={formik} accessor='confirm' />
            {/* <FormImage formik={formik} accessor='file' /> */}
            <button type="submit">Register</button>
            <Link to="/">
                <button type="button">Back</button>
            </Link>
        </form>
    </>
  )
}

export default FakeRegisterComponent