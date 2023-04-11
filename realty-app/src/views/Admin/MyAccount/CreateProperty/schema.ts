import * as yup from 'yup'

const { string: yString, number: yNumber } = yup

const Schema = yup.object({
  title: yString()
    .required('Título es requerido')
    .min(10, 'Mínimo 10 caracteres'),
  description: yString().required('Descripción es requerida').min(40),
  price: yNumber().required('Precio es requerido'),
  category: yNumber().required('Categoría es requerida'),
})

export default Schema
