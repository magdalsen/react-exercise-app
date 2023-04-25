import { useMutation,useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import {InferType} from "yup"

import { supabase } from "../../../../src/supabaseClient";
import { useNotificationContext } from "../../../contexts/NotificationContext";
import LoginWrapper from "../../LoginWrapper/LoginWrapper";
import { yupSchemaCardForm } from "../../validations/validations";
import { FormInput } from "../FormInput";

import style from "./CardForm.module.css"

export type FormValues = InferType<typeof yupSchemaCardForm>;

const Form = () => {
  const {toggleAlert}=useNotificationContext();
  const queryClient = useQueryClient();
    const addClient = async (values:FormValues) => {

      const { data, error } = await supabase
        .from('clients')
        .insert([
          { ...values },
        ])
        if (error) throw error;
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
    onSubmit: async (values:FormValues) => {
      if (await toggleAlert(`Client ${values.name} ${values.surname} added!`)) {
        // addClient(values);
        mutation.mutate(values);
      }
    },
    validationSchema: yupSchemaCardForm,
  });

  const mutation = useMutation(async (values:FormValues)=>await addClient(values), {
    onSuccess: () => {
      // rewalidacja i pobranie ponownie zapytania pod kluczem clients
      queryClient.invalidateQueries(["clients"]);
    },
    onError: (error)=>{
      throw error;
    }
  });

  return (
    <>
      <LoginWrapper>
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
      </LoginWrapper>
    </>
  )
}

export default Form