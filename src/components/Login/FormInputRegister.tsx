import { Input, InputLabel, TextField } from "@mui/material";
import { FormikProps } from "formik";
import { FormValues } from "./FakeRegisterComponent";

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


  // export const FormImage = ({
  //   formik,
  //   accessor,
  // }: {
  //   formik: FormikProps<FormValues>;
  //   accessor: keyof FormValues;
  // }) => {
  //   return (
  //       <div>
  //       <InputLabel id={accessor}>{accessor}</InputLabel>
  //       <Input
  //         error={Boolean(formik.touched[accessor] && formik.errors[accessor])}
  //         helperText={
  //           formik.touched[accessor] && formik.errors[accessor]
  //             ? (
  //               <p style={{ color: "red" }}>{formik.errors[accessor]}</p>
  //               ) : null
  //         }
  //         type={accessor}
  //         id={accessor}
  //         label={accessor}
  //         name={accessor}
  //         onChange={(event) => formik.setFieldValue("file", event.target.files[0])}
  //       />
  //     </div>
  //   );
  // };