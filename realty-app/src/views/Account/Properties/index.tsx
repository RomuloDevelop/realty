import React from 'react'
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled'
import useProperties from './useProperties'
import Spinner from '../../../components/Spinner'
import { Link } from 'react-router-dom'
import './Properties.scss'
import { NumericFormat } from 'react-number-format'

const Properties = () => {
  const {
    data,
    perPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    isLoading,
  } = useProperties()

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
                <th scope="col">Mis Propiedades</th>
                <th scope="col" />
                <th scope="col">Fecha de creación</th>
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
                    <td className="ltn__my-properties-img go-top">
                      <Link to="/product-details">
                        <div className="my-properties-img__container">
                          <img src={row.propertyImages[0].url} alt="#" />
                          <div className="my-properties-img__list">
                            <i className="fas fa-camera"></i>
                            {row.propertyImages.length}
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td>
                      <div className="ltn__my-properties-info">
                        <h6 className="mb-10 go-top">
                          <Link to="/product-details">
                            <NumericFormat
                              displayType="text"
                              prefix="$"
                              value={row.price as any as string}
                              thousandSeparator={','}
                              decimalSeparator={'.'}
                              decimalScale={2}
                            />
                          </Link>
                        </h6>
                        <small>
                          <i className="icon-placeholder" /> {row.address}
                        </small>
                        <p>{row.description}</p>
                      </div>
                    </td>
                    <td>{row.createdAt as any as string}</td>
                    <td>
                      <span className="action">
                        <i className="fa-regular fa-pen-to-square" />
                      </span>
                      <span className="action">
                        <i className="fa-solid fa-trash-can" />
                      </span>
                    </td>
                  </tr>
                ))}
              {!data.length && !isLoading && (
                <tr>
                  <td colSpan={6}>
                    <strong>Sin propiedades para mostrar</strong>
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <TablePaginationUnstyled
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={6}
                  count={data.length}
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

export default Properties
