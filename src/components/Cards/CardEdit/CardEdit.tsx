import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup"
import {InferType} from "yup"
import style from "../CardForm/CardForm.module.css"
import { useQueryClient, useMutation } from "@tanstack/react-query";

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

export const CardEdit = () => {
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
            .then(response => response.json())
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

    const formik = useFormik<FormValues>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values:FormValues) => {
        updateClient(values);
        alert(`Client ${values.name} ${values.surname} updated!`);
        // alert(`Updated values: ${JSON.stringify(values, null, 2)}`);
    },
    validationSchema: yupSchema,
  });
    
    return (
        <>
            Edycja wizytówki o id: {id}

            <form className={style.form} onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                    <p style={{ color: "red" }}>{formik.errors.name}</p>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="surname">Surname</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        onChange={formik.handleChange}
                        value={formik.values.surname}
                    />
                    <p style={{ color: "red" }}>{formik.errors.surname}</p>
                </div>
                <div>
                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        onChange={formik.handleChange}
                        value={formik.values.street}
                    />
                </div>
                <div>
                    <label htmlFor="postCode">Post code</label>
                    <input
                    type="text"
                    id="postCode"
                    name="postCode"
                    onChange={formik.handleChange}
                    value={formik.values.postCode}
                    />
                    <p style={{ color: "red" }}>{formik.errors.postCode}</p>
                </div>
                <div>
                    <label htmlFor="town">Miasto</label>
                    <input
                    type="text"
                    id="town"
                    name="town"
                    onChange={formik.handleChange}
                    value={formik.values.town}
                    />
                    <p style={{ color: "red" }}>{formik.errors.town}</p>
                </div>
                <div>
                    <label htmlFor="subRegion">Województwo</label>
                    <input
                    type="text"
                    id="subRegion"
                    name="subRegion"
                    onChange={formik.handleChange}
                    value={formik.values.subRegion}
                    />
                    <p style={{ color: "red" }}>{formik.errors.subRegion}</p>
                </div>
                <div>
                    <label htmlFor="phoneNumber">Numer telefonu</label>
                    <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                    />
                    <p style={{ color: "red" }}>{formik.errors.phoneNumber}</p>
                </div>
                <button type="submit" onClick={handleUpdatedData}>Zapisz zmiany</button>
                <Link to={`/clients/${id}`}>
                    <button type="button">Wróć</button>
                </Link>
            </form>
        </>
    )
}