import React from 'react'
import { Controller } from 'react-hook-form'
import { default as PhoneInputCore, PhoneInputProps } from 'react-phone-input-2'
import InputError from '../InputError'
import './PhoneInput.scss'

type Props = PhoneInputProps & {
  control: any
  inputClass?: string
}

const PhoneInput = ({ control, inputClass = '', ...rest }: Props) => {
  return (
    <Controller
      name="phone"
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState }) => (
        <div style={{ position: 'relative' }}>
          <PhoneInputCore
            {...field}
            {...rest}
            inputClass={`${inputClass} ${fieldState.error ? 'error' : ''}`}
          />
          <InputError error={fieldState.error?.message} />
        </div>
      )}
    />
  )
}

export default PhoneInput
