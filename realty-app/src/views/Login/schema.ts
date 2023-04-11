import * as yup from 'yup'

const yString = yup.string()

const Schema = yup.object({
  email: yString
    .required('Email is required')
    .email("Email doesn't have the correct format"),
  password: yString
    .required('Password is required')
    .min(8, 'Minimum of 8 characters'),
})

export default Schema
