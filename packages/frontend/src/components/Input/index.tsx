import React, { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import InputError, { Props as InputErrorProps } from '../InputError'

type Props = InputHTMLAttributes<HTMLInputElement> &
  Partial<InputErrorProps> & {
    containerClass?: string
    inputClass?: string
    register?: UseFormRegisterReturn | {}
    options?: { name: string; id: number }[]
  }

const Input = ({
  register = {},
  error = '',
  containerClass = '',
  inputClass = '',
  ...rest
}: Props) => {
  return (
    <div style={{ position: 'relative' }} className={containerClass}>
      <input
        {...register}
        {...rest}
        className={`${inputClass} ${error ? 'error' : ''}`}
      />
      <InputError error={error} />
    </div>
  )
}

export default Input
