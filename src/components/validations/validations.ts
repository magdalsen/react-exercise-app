import * as yup from "yup"

export const yupSchemaCardEdit=yup.object({
    imgSrc: yup.string().required("Obrazek musi być"),
    name: yup.string().required("Uzupełnij imię!"),
    surname: yup.string().required("Uzupełnij nazwisko!"),
    street: yup.string().required("Uzupełnij ulicę!"),
    postCode: yup.string().matches(/[0-9]{2}-[0-9]{3}/),
    town: yup.string().required("Uzupełnij miasto!"),
    subRegion: yup.string().min(3).optional(),
    phoneNumber: yup.string().matches(/\+[0-9]{9}/)
  })

  export const yupSchemaMoney=yup.object({
    money: yup.number()
        .moreThan(0)
        .required('Money value required!')
  })

  export const yupSchemaCardForm=yup.object({
    imgSrc: yup.string().required("Obrazek musi być"),
    name: yup.string().required("Uzupełnij imię!"),
    surname: yup.string().required("Uzupełnij nazwisko!"),
    street: yup.string().required("Uzupełnij ulicę!"),
    postCode: yup.string().matches(/[0-9]{2}-[0-9]{3}/),
    town: yup.string().required("Uzupełnij miasto!"),
    subRegion: yup.string().min(3).optional(),
    phoneNumber: yup.string().matches(/\+[0-9]{9}/)
  })

  export const yupSchemaInvoices=yup.object({
    money: yup.number()
        .moreThan(0)
        .required('Money value required!')
})

export const yupSchemaOrderForm=yup.object({
    title: yup.string().required("Uzupełnij tytuł!"),
    amount: yup.number().required("Uzupełnij ilość!"),
    orderOwner: yup.string().required("Uzupełnij ulicę!"),
    phoneNumber: yup.string().matches(/\+[0-9]{9}/),
    payed: yup.boolean(),
    ownerId: yup.number()
  })

  export const yupSchemaFakeLogin=yup.object({
    email: yup.string().email('Invalid email').required('E-mail required!'),
    password: yup.string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol')
      .required('Password required!')
  })

  export const yupSchemaFakeRegister=yup.object({
    name: yup.string().min(3, 'Min 3 characters!').required("Name required!"),
    surname: yup.string().min(2, 'Min 2 characters!').required("Surname required!"),
    email: yup.string().email('Invalid email').required('E-mail required!'),
    password: yup
      .string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol')
      .required('Password required!'),
    confirm: yup.string()
      .oneOf([yup.ref('password')], 'Must match "password" field value')
      .required('Confirm password required!'),
    // file: yup.object({
    //   file: yup.mixed().required('Avatar required!')
    // }),
    image: yup.string().required("Avatar required!"),
  })