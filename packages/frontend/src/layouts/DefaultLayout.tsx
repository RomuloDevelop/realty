import React, { ReactNode } from 'react'
import Navbar from '../components/global-components/navbar'
import CallToActionV1 from '../components/section-components/call-to-action-v1'
import Footer from '../components/global-components/footer'

type Props = {
  children: ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      {children}
      <CallToActionV1 />
      <Footer />
    </div>
  )
}

export default DefaultLayout
