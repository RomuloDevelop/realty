import * as yup from 'yup'

const numberMessage = 'Solo números'

const { string: yString, number: yNumber } = yup

const Schema = yup.object({
  title: yString()
    .required('Título es requerido')
    .min(10, 'Mínimo 10 caracteres'),
  description: yString().trim().required('Descripción es requerida').min(1),
  address: yString().trim().required('Dirección es requerida'),
  price: yNumber().required('Precio es requerido'),
  category: yNumber().required('Categoría es requerida'),
  province: yString().trim().required('Estado es requerido'),
  county: yString().trim().required('Condado es requerido'),
  city: yNumber().min(1, 'Ciudad es requerido').required('Ciudad es requerida'),
  neighborhood: yNumber(),
  zipCode: yString()
    .trim()
    .required('Código zip es requerido')
    .matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, 'Código zip inválido'),
  coordinates: yString()
    .required()
    .matches(
      /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/
    ),
  type: yNumber().required('Tipo de propiedad es requerido'),
  floors: yNumber().typeError(numberMessage).required(),
  area: yNumber().typeError(numberMessage).required().integer(numberMessage),
  baths: yNumber().typeError(numberMessage).required(),
  bedrooms: yNumber().typeError(numberMessage).required(),
  mis_number: yNumber().typeError(numberMessage).required(),
  files: yup
    .mixed<FileList>()
    .test('required', 'You need to provide a file', (file) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (file) return true
      return false
    }),
  // .test("fileSize", "The file is too large", (file) => {
  //   //if u want to allow only certain file sizes
  //   return file && file.size <= 2000000;
  // })
})

export default Schema
