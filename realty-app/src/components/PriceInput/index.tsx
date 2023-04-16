import React from 'react'
import { Controller } from 'react-hook-form'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import InputError from '../InputError'

type Props = NumericFormatProps & {
  control: any
}

const PriceInput = ({ control, ...rest }: Props) => {
  return (
    <Controller
      name="price"
      control={control}
      render={({ field, fieldState }) => (
        <div style={{ position: 'relative' }}>
          <NumericFormat
            {...rest}
            getInputRef={field.ref}
            onBlur={field.onBlur}
            onValueChange={(values) => field.onChange(values.floatValue)}
            name={field.name}
            value={field.value}
            className={fieldState.error ? 'error' : ''}
            decimalSeparator="."
            decimalScale={2}
            thousandSeparator=","
          />
          <InputError error={fieldState.error?.message} />
        </div>
      )}
    />
  )
}

export default PriceInput
