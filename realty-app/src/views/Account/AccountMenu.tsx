import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Role } from '../../constants'
import { useAuth } from '../../providers/AuthContext'

const AccountMenu = () => {
  const { url } = useRouteMatch()
  const { user } = useAuth()
  return (
    <div className="ltn__tab-menu-list mb-50">
      <div className="nav">
        {/* <Link to={`${url}/profile-detail`}>
          Perfiles <i className="fas fa-user" />
        </Link> */}
        <Link to={`${url}`}>
          Detalles de Cuenta <i className="fas fa-user" />
        </Link>
        {user?.roleId === Role.Admin && (
          <>
            <Link to={`${url}/properties`}>
              Mis Propiedades <i className="fa-solid fa-list" />
            </Link>
            <Link to={`${url}/users`}>
              Usuarios <i className="fas fa-user" />
            </Link>
            <Link to={`${url}/add-property`}>
              Agregar Propiedad
              <i className="fa-solid fa-map-location-dot" />
            </Link>
          </>
        )}
        <a href="login.html">
          Cerrar Sesión <i className="fas fa-sign-out-alt" />
        </a>
      </div>
    </div>
  )
}

export default AccountMenu
