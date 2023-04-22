import * as yup from 'yup'

const { string: yString } = yup

const schema = yup.object({
  first_name: yString().required('Nombre es requerido'),
  last_name: yString().notRequired().default(null),
  phone: yString().required('Teléfono es requerido'),
  address: yString().required('Dirección es requerida'),
  email: yString()
    .required('Correo es requerido')
    .email('Correo no tiene el formato correcto'),
  actualPassword: yString().nullable().default(null),
  password: yString().nullable().default(null),
  confirmPassword: yString()
    .oneOf([yup.ref('password')], 'Contraseñas deben ser iguales')
    .default(null),
})

export default schema
