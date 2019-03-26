import React, { Component } from "react";
import Login from '../components/Login_Register/Login'
import Register from '../components/Login_Register/Register'

import {SOCKET} from "../index";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: true
    };
    this.changePage = this.changePage.bind(this);
    this.submit = this.submit.bind(this);
  }

  changePage(login){
    this.setState({login: login})
  }

  submit(data){
    if(this.state.login){
      SOCKET.emit('login', data);
    }else{
      SOCKET.emit('register', data);
    }
  }

  render() {
    return (
      <div className="container">
        {
          this.state.login ?
          (<Login page={this.changePage} submit={this.submit}/>) :
          (<Register page={this.changePage} submit={this.submit}/>)
        }
      </div>
    );
  }
}
