import React, { ReactNode } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

type Props = {
    children: ReactNode
}

const queryClient = new QueryClient()

export const Providers = ({children}: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools position='bottom-right' initialIsOpen={false} />
    </QueryClientProvider>
  )
}
