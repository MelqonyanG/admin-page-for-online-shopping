import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Main from "layouts/Main.jsx"
import Admin from "layouts/Admin.jsx";
import User from "layouts/User.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";
import 'bootstrap/dist/css/bootstrap.css'

import io from 'socket.io-client';
import data from './client_config.json';

const SOCKET = io.connect(data.server.host + ':' + data.server.port);

const hist = createBrowserHistory();

SOCKET.on('connect', function () {
  ReactDOM.render(
    <Main />,
    document.getElementById("root")
  );
});

SOCKET.on('admin', function () {
  ReactDOM.render(
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>,
    document.getElementById("root")
  );
});

SOCKET.on('user', function () {
  ReactDOM.render(
    <User />,
    document.getElementById("root")
  )
});

export {SOCKET};
