import React, { ButtonHTMLAttributes, HTMLProps } from 'react'
import Spinner from '../Spinner'
import './Button.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }

const Button = ({ children, loading, className, ...rest }: Props) => {
  return (
    <button
      {...rest}
      disabled={loading}
      className={'custom-button theme-btn-1 btn btn-block ' + className}
    >
      {loading ? <Spinner size={30} /> : children}
    </button>
  )
}

export default Button
