import { useQuery } from '@tanstack/react-query'
import React, { useCallback, useEffect, useState } from 'react'
import useFirstRender from '../../../../hooks/useFirstRender'
import { getProperties } from '../../../../services'

const useProperties = () => {
  const [page, setPage] = useState<number>(0)
  const [perPage, setRowsPerPage] = useState<number>(10)
  const isFirstRender = useFirstRender()

  const { data, refetch, isLoading } = useQuery(['properties'], () =>
    getProperties({ page, perPage })
  )

  const handleChangePage = useCallback(
    (_: any, newPage: number) => setPage(newPage),
    []
  )

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      console.log(event.target.value)
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    },
    []
  )

  useEffect(() => {
    !isFirstRender && refetch()
  }, [page, perPage])

  return {
    page,
    perPage,
    handleChangePage,
    handleChangeRowsPerPage,
    data: data?.length ? data : [],
    isLoading,
  }
}

export default useProperties
