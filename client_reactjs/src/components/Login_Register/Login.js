import React, { Component } from "react";
import '../../assets/css/Login.css';

import {SOCKET} from "../../index";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      msg: ""
    };
    this.login = this.login.bind(this);
    this.change_email = this.change_email.bind(this);
    this.change_password = this.change_password.bind(this);

    SOCKET.on('login_error', ()=>{
      this.setState({msg: 'Invalid email or password'})
    } )
  }

  componentWillUnmount() {
    SOCKET.removeListener('login_error');
    this.setState({'msg': ''})
  }

  change_email(e){
    this.setState({email: e.target.value});
  }

  change_password(e){
    this.setState({password: document.getElementById('password').value});
  }

  login(){
    const data = this.state;
    this.props.submit(data);
  }

  render() {
    return (
      <div className="container">
      <div id='form'>
              <div className="form-group">
              <p style={{color:'red'}}>{this.state.msg}</p>
                 <label htmlFor="exampleInputEmail1">Email address</label>
                 <input type="email" name="email"  className="form-control" id="email"
                    aria-describedby="emailHelp" placeholder="Enter email"
                      value={this.state.email || ''} onChange={this.change_email}/>
              </div>
              <div className="form-group">
                 <label htmlFor="exampleInputEmail1">Password</label>
                 <input type="password" name="password" id="password"  className="form-control"
                    aria-describedby="emailHelp" placeholder="Enter Password"
                      value={this.state.password || ''} onChange={this.change_password}/>
              </div>
              <div className="col-md-12 text-center ">
                 <button className=" btn btn-block mybtn btn-primary tx-tfm"
                      onClick={this.login}>Login</button>
              </div>
              <div className="col-md-12 ">
                 <div className="login-or">
                    <hr className="hr-or"/>
                 </div>
              </div>
              <div className="form-group">
                 <p className="text-center">Don't have account? <span id="signup"
                      onClick={()=>{this.props.page(false)}}>Sign up here</span></p>
              </div>
           </div>
        </div>
    );
  }
}
