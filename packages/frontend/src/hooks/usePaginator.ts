import React, { useCallback, useEffect, useState } from 'react'
import useFirstRender from './useFirstRender'

const usePaginator = (refetch: () => void) => {
  const [page, setPage] = useState<number>(0)
  const [perPage, setRowsPerPage] = useState<number>(10)
  const isFirstRender = useFirstRender()

  useEffect(() => {
    !isFirstRender && refetch()
  }, [page, perPage])

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

  return {
    page,
    perPage,
    handleChangePage,
    handleChangeRowsPerPage,
  }
}

export default usePaginator
