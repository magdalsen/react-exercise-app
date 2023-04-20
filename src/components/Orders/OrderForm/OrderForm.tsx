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
  const {toggleAlert}=useNotificationContext();
    const addOrder = async (values:FormValues) => {
      const { data, error } = await supabase
      .from('orders')
      .insert([
        { ...values },
      ])
      if (error) throw error;
      return data;
    }

    const fetchFn = async () => {
      const { data, error } = await supabase
      .from('clients')
      .select('*')
      if (error) throw error;
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
    onSubmit: async (values:FormValues) => {
      const alert = await toggleAlert(`Order ${values.title} added!`);
      if (alert) {
        const ownerIdFilter = data && data.filter((el: { name: string; surname: string; id: number; })=>{
          if (`${el.name} ${el.surname}` === values.orderOwner) {
              return el.id;
          }
        });
        const ownerId = ownerIdFilter && ownerIdFilter[0].id;
        const id = {ownerId};
        addOrder({...values, ...id});
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
            <button type="submit">Save</button>
        </form>
      </LoginWrapper>
    </>
  )
}

export default FormOrder