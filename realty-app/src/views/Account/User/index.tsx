import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import UserList from './UserList'
import UserDetail from './UseDetail'

const Users = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/:id`} component={UserDetail} />
      <Route path={path} component={UserList} />
    </Switch>
  )
}

export default Users
