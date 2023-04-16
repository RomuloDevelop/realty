import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

const AdminMenu = () => {
  const { url } = useRouteMatch()

  return (
    <div className="col-lg-4">
      <div className="ltn__tab-menu-list mb-50">
        <div className="nav">
          <Link to={url}>
            My Properties <i className="fa-solid fa-list" />
          </Link>
          <Link to={`${url}/profile-detail`}>
            Profiles <i className="fas fa-user" />
          </Link>
          <Link to={`${url}/account-detail`}>
            Account Details <i className="fas fa-user" />
          </Link>
          {/* <a href="#ltn_tab_1_6">
            Favorited Properties <i className="fa-solid fa-heart" />
          </a> */}
          <Link to={`${url}/add-property`}>
            Add Property <i className="fa-solid fa-map-location-dot" />
          </Link>
          <a href="login.html">
            Logout <i className="fas fa-sign-out-alt" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminMenu
