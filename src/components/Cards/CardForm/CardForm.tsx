import { useFormik } from "formik";
import { FormInput } from "../FormInput";
import * as yup from "yup"
import {InferType} from "yup"
import style from "./CardForm.module.css"

const yupSchema=yup.object({
  imgSrc: yup.string().required("Obrazek musi być"),
  name: yup.string().required("Uzupełnij imię!"),
  surname: yup.string().required("Uzupełnij nazwisko!"),
  street: yup.string().required("Uzupełnij ulicę!"),
  postCode: yup.string().matches(/[0-9]{2}-[0-9]{3}/),
  town: yup.string().required("Uzupełnij miasto!"),
  subRegion: yup.string().min(3).optional(),
  phoneNumber: yup.string().matches(/\+[0-9]{9}/)
})

export type FormValues = InferType<typeof yupSchema>;

export const Form = () => {

    const addClient = async (values:FormValues) => {
        const response = await fetch(`http://localhost:8000/clients`, {
          method: "POST",
           headers: {"Content-type": "application/json;charset=UTF-8"},
          body: JSON.stringify(values),
        });
        if (!response.ok) {
          return {};
        }
        const data = await response.json();
        return data;
    }

    const formik = useFormik<FormValues>({
    initialValues: {
      imgSrc: "https://images.unsplash.com/photo-1661869535393-872dea2d9f8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
      name: "",
      surname: "",
      street: "",
      postCode: "",
      town: "",
      subRegion: "",
      phoneNumber: ""
    },
    onSubmit: (values:FormValues) => {
        addClient(values);
        alert(`Client ${values.name} ${values.surname} added!`);
    },
    validationSchema: yupSchema,
  });

  return (
    <>
        <form className={style.form} onSubmit={formik.handleSubmit}>
            <FormInput formik={formik} accessor='name' />
            <FormInput formik={formik} accessor='surname' />
            <FormInput formik={formik} accessor='street' />
            <FormInput formik={formik} accessor='postCode' />
            <FormInput formik={formik} accessor='town' />
            <FormInput formik={formik} accessor='subRegion' />
            <FormInput formik={formik} accessor='phoneNumber' />
            <button type="submit">Zapisz</button>
        </form>
    </>
  )
}
