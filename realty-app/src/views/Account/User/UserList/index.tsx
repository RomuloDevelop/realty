import { TablePaginationUnstyled } from '@mui/base'
import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Spinner from '../../../../components/Spinner'
import useUsers from './useUserList'

const UserList = () => {
  const { url } = useRouteMatch()

  const {
    isLoading,
    data,
    page,
    perPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useUsers()

  return (
    <div id="ltn_tab_1_1">
      <div
        className="ltn__myaccount-tab-content-inner"
        style={{ overflow: 'visible' }}
      >
        <div className="ltn__my-properties-table table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Role</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={6}>
                    <Spinner />
                  </td>
                </tr>
              )}
              {!!data?.length &&
                !isLoading &&
                data.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>
                      <div className="ltn__my-properties-info">
                        <span className="mb-10 go-top">{row.first_name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="go-top">{row.email}</span>
                    </td>
                    <td>
                      <span className="mb-10 go-top">{row.phone}</span>
                    </td>
                    <td className="ltn__my-properties-img go-top">
                      <span>{row.role}</span>
                    </td>
                    <td>
                      <Link to={`${url}/${row.id}`}>
                        <span className="action">
                          <i className="fa-regular fa-pen-to-square" />
                        </span>
                      </Link>
                      <span className="action">
                        <i className="fa-solid fa-trash-can" />
                      </span>
                    </td>
                  </tr>
                ))}
              {!data?.length && !isLoading && (
                <tr>
                  <td colSpan={6}>
                    <strong>Sin usuarios para mostrar</strong>
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <TablePaginationUnstyled
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={6}
                  count={data?.length || 0}
                  rowsPerPage={perPage}
                  page={page}
                  slotProps={{
                    select: {
                      'aria-label': 'Propiedades',
                      className: 'input-item',
                    },
                    actions: {
                      showFirstButton: true,
                      showLastButton: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserList
