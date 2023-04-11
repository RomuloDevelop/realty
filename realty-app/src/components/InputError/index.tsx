import React from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import './InputError.scss'

export type Props = {
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
}

const InputError = ({ error }: Props) => (
  <p className={'input-error' + (error ? ' show' : '')}>{error?.toString()}</p>
)

export default InputError
