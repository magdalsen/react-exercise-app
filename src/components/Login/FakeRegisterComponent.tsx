import { Link } from "react-router-dom";
import { useFormik } from "formik";
import {InferType} from "yup"

import { useNotificationContext } from "../../contexts/NotificationContext";
import { supabase } from "../../supabaseClient";
import { yupSchemaFakeRegister } from "../validations/validations";

import { FormInput } from "./FormInputRegister";

import style from "../Cards/CardForm/CardForm.module.css"

export type FormValues = InferType<typeof yupSchemaFakeRegister>;

const FakeRegisterComponent = () => {
  const {toggleAlert}=useNotificationContext();

    const addClient = async (values:FormValues) => {
      const { data, error } = await supabase.auth.signUp({ 
        email: values.email,
        password: values.password
      })
      if (error) {
        throw error;
      }
      if (data && data.user) {
        const { data:userr, error } = await supabase
        .from('users')
        .insert([
          { id: data.user?.id, name: values.name, surname: values.surname, image: values.image }
        ])
        if (error != null) {
          if (await toggleAlert("User already exist! Use different email")===true) return false;
        }
        if (userr === null) {
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
    validationSchema: yupSchemaFakeRegister,
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