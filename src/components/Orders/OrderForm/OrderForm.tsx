import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup"
import {InferType} from "yup"
import { CardProps } from "../../Cards/Cards";
import style from "../../Cards/CardForm/CardForm.module.css";
import { FormInput, FormSelect } from "../FormInput";

const yupSchema=yup.object({
  title: yup.string().required("Uzupełnij tytuł!"),
  amount: yup.number().required("Uzupełnij ilość!"),
  orderOwner: yup.string().required("Uzupełnij ulicę!"),
  phoneNumber: yup.string().matches(/\+[0-9]{9}/)
})

export type FormValues = InferType<typeof yupSchema>;

export const FormOrder = () => {
    const addOrder = async (values:FormValues) => {
        const response = await fetch(`http://localhost:8000/orders`, {
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

    const fetchFn = async () => {
        const response = await fetch('http://localhost:8000/clients');
        const res = await response.json();
        const data = await res;
        return data;
    }
    const {data, isLoading, error}=useQuery<CardProps[]>(["clients"],fetchFn);

    const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      amount: 0,
      orderOwner: "",
      phoneNumber: ""
    },
    onSubmit: (values:FormValues) => {
        const ownerIdFilter = data && data.filter((el)=>{
            if (`${el.name} ${el.surname}` === values.orderOwner) {
                return el.id;
            }
        });
        const ownerId = ownerIdFilter && ownerIdFilter[0].id;
        const id = {ownerId};
        addOrder({...values, ...id});
        alert(`Order ${values.title} added!`);
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
        <form className={style.form} onSubmit={formik.handleSubmit}>
            <FormInput formik={formik} accessor='title' />
            <FormInput formik={formik} accessor='amount' />
            <FormSelect formik={formik} accessor='orderOwner' data={data} />
            <FormInput formik={formik} accessor='phoneNumber' />
            <button type="submit">Save</button>
        </form>
    </>
  )
}
