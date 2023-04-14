import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup"
import {InferType} from "yup"

import LoginWrapper from "../../../components/LoginWrapper";
import { useNotificationContext } from "../../../contexts/NotificationContext";
import { supabase } from "../../../supabaseClient";
import { CardProps } from "../../Cards/Cards";
import { FormInput, FormSelect } from "../FormInput";

import style from "../../Cards/CardForm/CardForm.module.css";

const yupSchema=yup.object({
  title: yup.string().required("Uzupełnij tytuł!"),
  amount: yup.number().required("Uzupełnij ilość!"),
  orderOwner: yup.string().required("Uzupełnij ulicę!"),
  phoneNumber: yup.string().matches(/\+[0-9]{9}/),
  payed: yup.boolean()
})

export type FormValues = InferType<typeof yupSchema>;

const FormOrder = () => {
  const {alertText,setAlertText,toggleAlert}=useNotificationContext();
    const addOrder = async (values:FormValues) => {
      const { data, error } = await supabase
      .from('orders')
      .insert([
        { ...values },
      ])
      return data;
        // const response = await fetch(`http://localhost:8000/orders`, {
        //   method: "POST",
        //    headers: {"Content-type": "application/json;charset=UTF-8"},
        //   body: JSON.stringify(values),
        // });
        // if (!response.ok) {
        //   return {};
        // }
        // const data = await response.json();
        // return data;
    }

    const fetchFn = async () => {
      const { data, error } = await supabase
      .from('clients')
      .select('*')
        // const response = await fetch('http://localhost:8000/clients');
        // const res = await response.json();
        // const data = await res;
        return data;
    }
    const {data, isLoading, error}=useQuery<CardProps[]>(["clients"],fetchFn);

    const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      amount: 0,
      orderOwner: "",
      phoneNumber: "",
      payed: false,
    },
    onSubmit: (values:FormValues) => {
        if (alertText !== '') {
          const ownerIdFilter = data && data.filter((el)=>{
            if (`${el.name} ${el.surname}` === values.orderOwner) {
                return el.id;
            }
          });
          const ownerId = ownerIdFilter && ownerIdFilter[0].id;
          const id = {ownerId};
          addOrder({...values, ...id});
          setAlertText(`Order ${values.title} added!`);
        }
    },
    validationSchema: yupSchema,
  });

  if(error){
    return <p>Cannot get data</p>
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <LoginWrapper>
        <form className={style.form} onSubmit={formik.handleSubmit}>
            <FormInput formik={formik} accessor='title' />
            <FormInput formik={formik} accessor='amount' />
            <FormSelect formik={formik} accessor='orderOwner' data={data} />
            <FormInput formik={formik} accessor='phoneNumber' />
            <button type="submit" onClick={toggleAlert}>Save</button>
        </form>
      </LoginWrapper>
    </>
  )
}

export default FormOrder