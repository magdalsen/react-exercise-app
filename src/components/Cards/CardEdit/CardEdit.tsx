import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup"
import {InferType} from "yup"
import style from "../CardForm/CardForm.module.css"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { FormInput } from "../FormInput";
import { useNotificationContext } from "../../../contexts/NotificationContext";

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
    const {alertText,setAlertText,toggleAlert}=useNotificationContext();
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
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };
        fetch(`http://localhost:8000/clients/${id}`, requestOptions)
            .then(response => {return response.json()})
            .then(data => {
                setData(data);
                return data;
            })
    }

    const mutation = useMutation(async (values:any)=>{return await updateClient(values)}, {
      onSuccess: () => {
        queryClient.invalidateQueries(['clients']);
      },
      onError: ()=>{
        throw new Error("Something went wrong :(");
      }
    });

    const handleUpdatedData = () => {
        mutation.mutate(data);
    }

    useEffect(() => {
        fetch(`http://localhost:8000/clients/${id}`)
          .then(res => {
            return res.json();
          })
          .then((data) => {
            setInitialValues(data);
          })
      }, []);

    const twoFn = () => {
      handleUpdatedData();
      toggleAlert();
    }

    const formik = useFormik<FormValues>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values:FormValues) => {
        if (alertText !== '') {
          updateClient(values);
          setAlertText(`Client ${values.name} ${values.surname} updated!`);
        }
        // alert(`Updated values: ${JSON.stringify(values, null, 2)}`);
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
                <button type="submit" onClick={twoFn}>Zapisz zmiany</button>
                <Link to={`/clients/${id}`}>
                    <button type="button">Wróć</button>
                </Link>
            </form>
        </>
    )
}

export default CardEdit