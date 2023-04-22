import React, { useCallback, useState } from 'react'
import SelectUnstyled, { SelectUnstyledProps } from '@mui/base/SelectUnstyled'
import OptionUnstyled from '@mui/base/OptionUnstyled'
import { Controller } from 'react-hook-form'
import './Select.scss'
import { ClickAwayListener, SelectOption } from '@mui/base'
import InputError from '../InputError'

type Props = SelectUnstyledProps<any, boolean> & {
  options: { id: any; name: string }[]
  control: any
  name: string
  defaultLabel?: string
  loading?: boolean
}

const Listbox = ({ children, enter, ...props }: any) => (
  <ul {...props} className={`list ${!enter ? 'out' : ''}`}>
    {children}
  </ul>
)

const renderValue = (
  option: SelectOption<{}> | null,
  defaultLabel?: string
) => {
  if (option == null) {
    return (
      <span className="selected">
        {defaultLabel ? defaultLabel : 'Selecciona una opción...'}
      </span>
    )
  }

  return <span className="selected">{option.label}</span>
}

const Select = ({ options, control, name, loading, defaultLabel }: Props) => {
  const [open, setOpen] = useState(false)
  const [enter, setEnter] = useState(true)

  const changeOpen = useCallback(
    (value: boolean, onBlur: () => void) => {
      if (open === value) return

      if (!value) {
        setEnter(value)
        setTimeout(() => {
          setOpen(value)
          onBlur()
        }, 300)
      } else {
        setEnter(true)
        setOpen(true)
      }
    },
    [open]
  )

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="input-item">
          <SelectUnstyled
            listboxOpen={open}
            onListboxOpenChange={(value) => changeOpen(value, field.onBlur)}
            onChange={(e, newValue) => {
              field.onChange(newValue)
            }}
            className={`nice-select ${loading ? 'loading' : ''} ${
              fieldState.error ? 'error' : ''
            }`}
            slots={{
              listbox: ({ children, ...props }) => (
                <Listbox {...props} enter={enter}>
                  {children}
                </Listbox>
              ),
            }}
            renderValue={(option) => renderValue(option, defaultLabel)}
          >
            <ClickAwayListener
              onClickAway={() => changeOpen(false, field.onBlur)}
            >
              <div>
                {options.map((item) => (
                  <OptionUnstyled key={item.name} value={item.id}>
                    {item.name}
                  </OptionUnstyled>
                ))}
              </div>
            </ClickAwayListener>
          </SelectUnstyled>
          <InputError error={fieldState.error?.message} />
        </div>
      )}
    />
  )
}

export default Select
