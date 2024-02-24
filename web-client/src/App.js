// 根组件
import React, { Component } from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import Login from './views/login/Login'
import Register from './views/register/Register'
import ForgotPassword from './views/forgot-password/forgot';

import Admin from './views/admin/Admin'
export default class App extends Component {
  render() {    
    return (
      <HashRouter>
        <Switch>
          <Route path='/register' component={Register}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/forgot-password/' component={ForgotPassword}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </HashRouter>
    )
  }
}
