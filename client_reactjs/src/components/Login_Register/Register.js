import React, { Component } from "react";
import '../../assets/css/Login.css';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: '',
      address: '',
      phone: '',
      email: '',
      password: ''
    };

    this.change_first_name = this.change_first_name.bind(this);
    this.change_last_name = this.change_last_name.bind(this);
    this.change_address = this.change_address.bind(this);
    this.change_phone = this.change_phone.bind(this);
    this.change_email = this.change_email.bind(this);
    this.change_password = this.change_password.bind(this);

    this.register = this.register.bind(this);
  }

  register(){
    const data = this.state;
    this.props.submit(data);
  }

  change_first_name(e){
    this.setState({first_name: e.target.value})
  }

  change_last_name(e){
    this.setState({last_name: e.target.value})
  }

  change_address(e){
    this.setState({address: e.target.value})
  }

  change_phone(e){
    this.setState({phone: e.target.value})
  }

  change_email(e){
    this.setState({email: e.target.value})
  }

  change_password(e){
    this.setState({password: document.getElementById('password').value})
  }

  render() {
    return (
      <div className="container">
      <div id='form'>
          <div className="form-group">
             <label htmlFor="exampleInputEmail1">First Name</label>
             <input type="text"  name="firstname" className="form-control" id="firstname"
                value={this.state.first_name || ''} onChange={this.change_first_name} placeholder="Enter Firstname"/>
          </div>
          <div className="form-group">
             <label htmlFor="exampleInputEmail1">Last Name</label>
             <input type="text"  name="lastname" className="form-control" id="lastname"
                value={this.state.last_name || ''} onChange={this.change_last_name} placeholder="Enter Lastname"/>
          </div>
          <div className="form-group">
             <label htmlFor="exampleInputAddress">Address</label>
             <input type="email" name="address"  className="form-control" id="address"
                value={this.state.address || ''} onChange={this.change_address} placeholder="Enter address"/>
          </div>
          <div className="form-group">
             <label htmlFor="exampleInputPhone">Phone</label>
             <input type="tel" name="phone"  className="form-control" id="phone"
                value={this.state.phone || ''} onChange={this.change_phone} placeholder="Enter phone"/>
          </div>
          <div className="form-group">
             <label htmlFor="exampleInputEmail1">Email address</label>
             <input type="email" name="email"  className="form-control" id="email"
                value={this.state.email || ''} onChange={this.change_email} placeholder="Enter email"/>
          </div>
          <div className="form-group">
             <label htmlFor="exampleInputEmail1">Password</label>
             <input type="password" name="password" id="password"  className="form-control"
                value={this.state.password || ''} onChange={this.change_password} placeholder="Enter Password"/>
          </div>
          <div className="col-md-12 text-center mb-3">
             <button className=" btn btn-block mybtn btn-primary tx-tfm" onClick={this.register}>Register</button>
          </div>
          <div className="col-md-12 ">
             <div className="form-group">
                <p className="text-center"><span id="signin" onClick={()=>{this.props.page(true)}}>Already have an account?</span></p>
             </div>
          </div>
       </div>
    </div>
    );
  }
}
