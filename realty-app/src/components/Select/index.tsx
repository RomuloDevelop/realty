import React, { useEffect, useState } from 'react'
import SelectUnstyled, { SelectUnstyledProps } from '@mui/base/SelectUnstyled'
import OptionUnstyled from '@mui/base/OptionUnstyled'
import { Controller } from 'react-hook-form'
import './Select.scss'

type Props = SelectUnstyledProps<any, boolean> & {
  options: { value: any; description: string }[]
  control: any
  name: string
}

const Listbox = ({ children, enter }: any) => (
  <ul
    className="list"
    style={{ animationName: enter ? 'inAnimation' : 'outAnimation' }}
  >
    {children}
  </ul>
)

const Select = ({ options, control, name }: Props) => {
  const [open, setOpen] = useState(false)
  const [enter, setEnter] = useState(false)

  const changeOpen = (value: boolean) => {
    if (value) {
      setOpen(value)
      setTimeout(() => {
        setEnter(value)
      }, 300)
    } else {
      setEnter(value)
      setTimeout(() => {
        setOpen(value)
      }, 300)
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="input-item">
          <SelectUnstyled
            listboxOpen={open}
            onListboxOpenChange={changeOpen}
            onChange={(e) => {
              field.onChange((e?.target as any).value)
            }}
            className={'nice-select'}
            slots={{
              listbox: ({ children }) => (
                <Listbox enter={enter}>{children}</Listbox>
              ),
            }}
          >
            {options.map((item, i) => (
              <OptionUnstyled value={item.value} key={i}>
                {item.description}
              </OptionUnstyled>
            ))}
          </SelectUnstyled>
        </div>
      )}
    />
  )
}

export default Select
