import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup"
import {InferType} from "yup"

import { useNotificationContext } from "../../../contexts/NotificationContext";
import { supabase } from "../../../supabaseClient";
import { FormInput } from "../FormInput";

import style from "../CardForm/CardForm.module.css"

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

const CardEdit = () => {
    const {toggleAlert}=useNotificationContext();
    const [data, setData] = useState<FormValues>();
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

    const handleUpdatedData = () => {
        if(data) {
          mutation.mutate(data);
        }
    }

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

    const formik = useFormik<FormValues>({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values:FormValues) => {
      const alert = await toggleAlert(`Client ${values.name} ${values.surname} updated!`);
      if (alert) {
        await updateClient(values);
        handleUpdatedData();
      }
    },
    validationSchema: yupSchema,
  });
    
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