import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Router, Route, IndexRoute} from 'react-router';
import Home from './home';
import Login from './login';
import App from './app';
import auth from './auth'

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}


ReactDOM.render(
  <Router history={browserHistory}>
      <Route path="/" component={App}>
      <IndexRoute component={Home} onEnter={requireAuth}/>
      <Route path="login" component={Login}/>
    </Route>
    </Router>, 
  document.querySelector('.app'))
