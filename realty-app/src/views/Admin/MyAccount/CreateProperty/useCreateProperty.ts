import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { InferType } from 'yup'
import Schema from './schema'

const useCreateProperty = () => {
  const { handleSubmit, control, watch } = useForm<InferType<typeof Schema>>({
    resolver: yupResolver(Schema),
  })

  console.log(watch('price'))

  const send = () => {
    console.log('send')
  }

  return {
    handleSubmit: handleSubmit(send),
    control,
  }
}

export default useCreateProperty
