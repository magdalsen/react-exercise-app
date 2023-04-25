import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import {InferType} from "yup"

import { useNotificationContext } from "../../../contexts/NotificationContext";
import { supabase } from "../../../supabaseClient";
import { CardProps } from "../../Cards/Cards";
import LoginWrapper from "../../LoginWrapper/LoginWrapper";
import { yupSchemaOrderForm } from "../../validations/validations";
import { FormInput, FormSelect } from "../FormInput";

import style from "../../Cards/CardForm/CardForm.module.css";

export type FormValues = InferType<typeof yupSchemaOrderForm>;

const FormOrder = () => {
  const {toggleAlert}=useNotificationContext();
  const queryClient = useQueryClient();
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
      if (await toggleAlert(`Order ${values.title} added!`)) {
        const ownerIdFilter = data && data.filter((el: { name: string; surname: string; id: number; })=>{
          if (`${el.name} ${el.surname}` === values.orderOwner) {
              return el.id;
          }
        });
        const ownerId = ownerIdFilter && ownerIdFilter[0].id;
        const id = {ownerId};
        // addOrder({...values, ...id});
        mutation.mutate({...values, ...id});
      }
    },
    validationSchema: yupSchemaOrderForm,
  });

  const mutation = useMutation(async (values:FormValues)=>await addOrder(values), {
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
    onError: ()=>{
      throw error;
    }
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