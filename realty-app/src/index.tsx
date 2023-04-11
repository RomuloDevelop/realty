import React from 'react'
import { createRoot } from 'react-dom/client'
import NavigationRoot from './navigations'
import { Providers } from './Providers'

function Root() {
  return (
    <Providers>
      <NavigationRoot />
    </Providers>
  )
}

export default Root

const container = document.getElementById('quarter') as HTMLElement
const root = createRoot(container)
root.render(<Root />)
