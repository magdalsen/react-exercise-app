import { FormControl, FormHelperText, MenuItem, Select, TextField } from "@mui/material";
import { FormikProps } from "formik";
import { FormValues } from "./OrderForm/OrderForm";
import InputLabel from '@mui/material/InputLabel';
import { CardProps } from "../Cards/Cards";

export const FormInput = ({
    formik,
    accessor,
  }: {
    formik: FormikProps<FormValues>;
    accessor: keyof FormValues;
  }) => {
    return (
        <div>
        <InputLabel id={accessor}>{accessor}</InputLabel>
        <TextField
          error={Boolean(formik.touched[accessor] && formik.errors[accessor])}
          helperText={
            formik.touched[accessor] && formik.errors[accessor]
              ? (
                <p style={{ color: "red" }}>{formik.errors[accessor]}</p>
                ) : null
          }
          id={accessor}
          label={accessor}
          name={accessor}
          onChange={formik.handleChange}
          value={formik.values[accessor]}
        />
      </div>
    );
  };

  export const FormSelect = ({
    formik,
    accessor,
    data
  }: {
    formik: FormikProps<FormValues>;
    accessor: keyof FormValues;
    data: CardProps[] | undefined;
  }) => {
    return (
      <FormControl fullWidth>
        <InputLabel id="select-owner-name">Client name</InputLabel>
        <Select
          labelId="select-owner-name"
          id={accessor}
          value={formik.values[accessor] ? formik.values[accessor] : ""}
          label={accessor}
          name={accessor}
          onChange={formik.handleChange}
        >
              {data && data.map((el)=>( 
                <MenuItem value={`${el.name} ${el.surname}`}>{`${el.name} ${el.surname}`}</MenuItem>
              ))}
        </Select>
        <FormHelperText>Select who make order</FormHelperText>
        </FormControl>
    );
  };
