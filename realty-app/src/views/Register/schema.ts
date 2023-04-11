import * as yup from 'yup'

const yString = yup.string()

const schema = yup.object({
  firstName: yString.required('Nombre es requerido'),
  lastName: yString.notRequired().default(null),
  phone: yString.required('Teléfono es requerido'),
  address: yString.required('Dirección es requerida'),
  email: yString
    .required('Correo es requerido')
    .email('Correo no tiene el formato correcto'),
  password: yString
    .required('Contraseña es requerida')
    .min(8, 'Mínimo de 8 caracteres'),
  confirmPassword: yString
    .required('Debes confirmar contraseña')
    .equals([yup.ref('password')], 'Contraseñas deben ser iguales'),
})

export default schema
