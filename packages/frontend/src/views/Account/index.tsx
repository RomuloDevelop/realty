import React from 'react'
import {
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from 'react-router-dom'
import Properties from './Properties'
import CreateProperty from './CreateProperty'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import AccountDetail from './AccountDetail'
import ProfileDetail from './User/UseDetail'
import ScreenLayout from '../../layouts/ScreenLayout'
import './Account.scss'
import AccountMenu from './AccountMenu'
import Users from './User'

const MyAccount = () => {
  const { path } = useRouteMatch()

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
                      <AccountMenu />
                    </div>
                    <div className="col-lg-8" style={{ position: 'relative' }}>
                      <div className="tab-content">
                        <Switch>
                          <Route
                            path={`${path}/add-property`}
                            component={CreateProperty}
                          />
                          <Route path={`${path}/users`} component={Users} />
                          <Route
                            path={`${path}/properties`}
                            component={Properties}
                          />
                          <Route path={'/'} component={AccountDetail} />
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
