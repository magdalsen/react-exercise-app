import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup"
import {InferType} from "yup"
import { CardProps } from "./Cards";
import style from "./Form.module.css"

const yupSchema=yup.object({
  title: yup.string().required("Uzupełnij tytuł!"),
  amount: yup.number().required("Uzupełnij ilość!"),
  orderOwner: yup.string().required("Uzupełnij ulicę!"),
  phoneNumber: yup.string().matches(/\+[0-9]{9}/)
})

export type FormValues = InferType<typeof yupSchema>;

export const FormOrder = () => {
    const [order, setOrder] = useState<FormValues[]>([]);
    const [client, setClient] = useState<CardProps[]>([]);
    const [postData, setPostId] = useState();
    const singleOrder = {...order};

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(singleOrder[0])
        };
        fetch('http://localhost:8000/orders', requestOptions)
            .then(response => response.json())
            .then(data => setPostId(data))
    }, [order]);

    useEffect(() => {
        fetch('http://localhost:8000/clients')
          .then(res => {
            return res.json();
          })
          .then((data) => {
            setClient(data);
          })
      }, []);

    const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      amount: 0,
      orderOwner: "",
      phoneNumber: ""
    },
    onSubmit: (values:FormValues) => {
        const ownerId = client.filter((el)=>{
            if ((el.name).concat(" ", el.surname) === values.orderOwner) {
                return el.id;
            }
        })
        setOrder(prev=>[{...values, id: Math.floor(Math.random() * 10) + 4, ownerId}]);
        alert(`Order ${values.title} added!`);
    },
    validationSchema: yupSchema,
  });

  return (
    <>
        <form className={style.form} onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                <p style={{ color: "red" }}>{formik.errors.title}</p>
                ) : null}
            </div>
            <div>
                <label htmlFor="amount">Amount</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    onChange={formik.handleChange}
                    value={formik.values.amount}
                />
                <p style={{ color: "red" }}>{formik.errors.amount}</p>
            </div>
            <div>
                <label htmlFor="orderOwner">Order Owner</label>
                <select name="orderOwner" id="orderOwner" value={formik.values.orderOwner} onChange={formik.handleChange}>
                    {client.map((el)=>( 
                            <option>{(el.name).concat(" ", el.surname)}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="phoneNumber">Phone number</label>
                <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                />
                <p style={{ color: "red" }}>{formik.errors.phoneNumber}</p>
            </div>
            <button type="submit">Save</button>
        </form>
    </>
  )
}
