import React from 'react'
import './spinner.scss'

type Props = {
  size?: number
}

const Spinner = ({size = 40}: Props) => {
  return (
    <div className='container-spinner'>
        <div className='spinner' style={{height: size, width: size}} />
    </div>
  )
}

export default Spinner
