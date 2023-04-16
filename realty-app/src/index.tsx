import React from 'react'
import { createRoot } from 'react-dom/client'
import NavigationRoot from './navigations'
import { Providers } from './Providers'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

function Root() {
  return (
    <Providers>
      <NavigationRoot />
      <ToastContainer />
    </Providers>
  )
}

export default Root

const container = document.getElementById('quarter') as HTMLElement
const root = createRoot(container)
root.render(<Root />)
