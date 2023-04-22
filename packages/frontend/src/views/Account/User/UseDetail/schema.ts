import * as yup from 'yup'

const { string: yString, number: yNumber } = yup

const schema = yup.object({
  first_name: yString().required('Nombre es requerido'),
  last_name: yString().notRequired().default(null),
  phone: yString().required('Teléfono es requerido'),
  address: yString().required('Dirección es requerida'),
  email: yString()
    .required('Correo es requerido')
    .email('Correo no tiene el formato correcto'),
  roleId: yNumber().required(),
  password: yString().nullable().default(null),
})

export default schema
