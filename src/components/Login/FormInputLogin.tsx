import { InputLabel, TextField } from "@mui/material";
import { FormikProps } from "formik";
import { FormValues } from "./FakeLoginComponent";

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