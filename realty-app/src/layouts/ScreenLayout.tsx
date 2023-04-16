import React, { ReactNode } from 'react'
import PageHeader from '../components/global-components/page-header'
import DefaultLayout from './DefaultLayout'

type Props = {
  children: ReactNode
  title: string
  subheader: string
}

const ScreenLayout = ({ children, title, subheader }: Props) => {
  return (
    <DefaultLayout>
      <PageHeader headertitle={title} subheader={subheader} />
      {children}
    </DefaultLayout>
  )
}

export default ScreenLayout
