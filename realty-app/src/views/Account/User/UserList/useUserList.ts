import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../../../services/users'
import usePaginator from '../../../../hooks/usePaginator'

const useUsers = () => {
  const { data, isFetching, refetch } = useQuery(
    ['users'],
    () =>
      getUsers({
        page,
        perPage,
      }),
    {
      onError: (error) => {
        console.error(error)
        toast.error('Hubo un error al solicitar usuarios')
      },
    }
  )

  const { page, perPage, handleChangePage, handleChangeRowsPerPage } =
    usePaginator(refetch)

  return {
    isLoading: isFetching,
    data,
    perPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
  }
}

export default useUsers
