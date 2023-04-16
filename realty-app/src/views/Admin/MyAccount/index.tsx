import React from 'react'
import { Link, Route, Router, Switch, useRouteMatch } from 'react-router-dom'
import Properties from './Properties'
import DefaultLayout from '../../../layouts/DefaultLayout'
import CreateProperty from './CreateProperty'
import AdminMenu from './AdminMenu'
import AccountDetail from './AccountDetail'
import ProfileDetail from './ProfileDetail'
import ScreenLayout from '../../../layouts/ScreenLayout'

const MyAccount = () => {
  const { path, url } = useRouteMatch()

  return (
    <ScreenLayout title="Cuenta" subheader="Administrador">
      <div className="liton__wishlist-area pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* PRODUCT TAB AREA START */}
              <div className="ltn__product-tab-area">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="ltn__tab-menu-list mb-50">
                        <div className="nav">
                          <Link to={url}>
                            Mis Propiedades <i className="fa-solid fa-list" />
                          </Link>
                          <Link to={`${url}/profile-detail`}>
                            Perfiles <i className="fas fa-user" />
                          </Link>
                          <Link to={`${url}/account-detail`}>
                            Detalles de Cuenta <i className="fas fa-user" />
                          </Link>
                          {/* <a href="#ltn_tab_1_6">
            Favorited Properties <i className="fa-solid fa-heart" />
          </a> */}
                          <Link to={`${url}/add-property`}>
                            Agregar Propiedad
                            <i className="fa-solid fa-map-location-dot" />
                          </Link>
                          <a href="login.html">
                            Cerrar Sesión <i className="fas fa-sign-out-alt" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="tab-content">
                        <Switch>
                          <Route
                            path={`${path}/add-property`}
                            component={CreateProperty}
                          />
                          <Route
                            path={`${path}/account-detail`}
                            component={AccountDetail}
                          />
                          <Route
                            path={`${path}/profile-detail`}
                            component={ProfileDetail}
                          />
                          <Route path={'/'} component={Properties} />
                        </Switch>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* PRODUCT TAB AREA END */}
            </div>
          </div>
        </div>
      </div>
    </ScreenLayout>
  )
}

export default MyAccount
