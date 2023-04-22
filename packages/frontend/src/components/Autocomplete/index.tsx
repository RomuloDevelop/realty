import { ClickAwayListener } from '@mui/base'
import React, {
  useState,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  ChangeEvent,
} from 'react'
import {
  Controller,
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from 'react-hook-form'
import InputError from '../InputError'
import './AutoComplete.scss'

type Option = { id: any; name: string }

type AutocompleteProps = InputHTMLAttributes<HTMLInputElement> & {
  options: Option[]
  loading?: boolean
  onSearch: (text: string) => void
  containerClassName?: string
}

type RootProps = AutocompleteProps & {
  error?: FieldError
  field: ControllerRenderProps<FieldValues, string>
}

type Props = AutocompleteProps & {
  name: string
  control: any
}

const RootComponent = ({
  field,
  error,
  options,
  onSearch,
  className,
  containerClassName,
  loading,
  ...rest
}: RootProps) => {
  const [enter, setEnter] = useState(true)
  const [open, setOpen] = useState(false)
  const [fieldValue, setFieldValue] = useState<string | undefined>('')

  const onFocus = useCallback(() => {
    setOpen(true)
  }, [])

  const onBlur = useCallback(() => {
    setEnter(false)
    setTimeout(() => {
      setOpen(false)
      field.onBlur()
      setEnter(true)
    }, 300)
  }, [field])

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value as any
      onSearch(value)
      setFieldValue(value)
    },
    [onSearch]
  )

  const onSelect = useCallback(
    (item: Option) => {
      setFieldValue(item.name)
      field.onChange(item.id)
      onBlur()
    },
    [field, onBlur]
  )

  useEffect(() => {
    if (!field.value) {
      setFieldValue('')
    }
  }, [field.value])

  return (
    <ClickAwayListener onClickAway={onBlur}>
      <div
        className={`autocomplete ${containerClassName || ''} ${
          loading ? 'loading' : ''
        }`}
      >
        <input
          value={fieldValue}
          onChange={onChange}
          className={`${className} ${error ? 'error' : ''}`}
          onFocus={onFocus}
          {...rest}
        />
        {error && <InputError error={error?.message} />}
        {options?.length && open ? (
          <ul className={`list ${!enter ? 'out' : ''}`}>
            {options.map((item) => (
              <li
                key={item.name}
                onClick={() => {
                  onSelect(item)
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </ClickAwayListener>
  )
}

const AutoComplete = ({ control, name, ...rest }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <RootComponent {...rest} field={field} error={fieldState.error} />
      )}
    />
  )
}

export default AutoComplete
