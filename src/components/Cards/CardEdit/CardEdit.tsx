import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import {InferType} from "yup"

import { useNotificationContext } from "../../../contexts/NotificationContext";
import { supabase } from "../../../supabaseClient";
import { yupSchemaCardEdit } from "../../validations/validations";
import { FormInput } from "../FormInput";

import style from "../CardForm/CardForm.module.css"

export type FormValues = InferType<typeof yupSchemaCardEdit>;

const CardEdit = () => {
    const {toggleAlert}=useNotificationContext();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [initialValues, setInitialValues] = useState({
        imgSrc: "https://images.unsplash.com/photo-1661869535393-872dea2d9f8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
        name: "",
        surname: "",
        street: "",
        postCode: "",
        town: "",
        subRegion: "",
        phoneNumber: ""
      });

    const updateClient = async (values:FormValues) => {
      const { data, error } = await supabase
        .from('clients')
        .update({ ...values })
        .eq('id', id)
        if (error) throw error;
        return data;
    }

    const mutation = useMutation(async (values:FormValues)=>await updateClient(values), {
      onSuccess: () => {
        queryClient.invalidateQueries(['clients']);
      },
      onError: ()=>{
        throw new Error("Something went wrong :(");
      }
    });

    const goFetch = async () => {
      const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      if (error) throw error;
      setInitialValues(data[0]);
    }

    useEffect(() => {
      goFetch();
    }, []);

    const {data:clients,isLoading,error}=useQuery(['clients'],goFetch);

    const formik = useFormik<FormValues>({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values:FormValues) => {
      if (await toggleAlert(`Client ${values.name} ${values.surname} updated!`)) {
        await updateClient(values);
        mutation.mutate(values);
      }
    },
    validationSchema: yupSchemaCardEdit,
  });

  if(error || !id || !clients){
    return <p>Cannot get client</p>
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
    
    return (
        <>
            Edycja wizytówki o id: {id}

            <form className={style.form} onSubmit={formik.handleSubmit}>
                <FormInput formik={formik} accessor='name' />
                <FormInput formik={formik} accessor='surname' />
                <FormInput formik={formik} accessor='street' />
                <FormInput formik={formik} accessor='postCode' />
                <FormInput formik={formik} accessor='town' />
                <FormInput formik={formik} accessor='subRegion' />
                <FormInput formik={formik} accessor='phoneNumber' />
                <button type="submit">Zapisz zmiany</button>
                <Link to={`/clients/${id}`}>
                    <button type="button">Wróć</button>
                </Link>
            </form>
        </>
    )
}

export default CardEdit