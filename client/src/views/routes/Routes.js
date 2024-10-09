import React, { lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Spinner from '../components/Spinner/Spinner'

const PageNotFound = lazy(() => import('../pages/PageNotFound/PageNotFound'))
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'))
const Register=lazy(()=>import('../pages/Register/Register'))
const Dashboard=lazy(()=>import('../pages/Dashboard/Dashboard'))

const Routes = () => {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
    </React.Suspense>
  )
}

export default Routes
