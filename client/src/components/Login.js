import React, { Component } from 'react'
import AuthService from '../services/AuthService'
import { Link } from "react-router-dom";
// import { Form, Card, CardTitle } from '../../styles/card';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    username: '',
    password: ''
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({...this.state, [name]:value})
  }
  handleLogin = (e) => {
    const { setUser, history } = this.props;
    e.preventDefault()
    this.authService.login(this.state)
    .then(
      (user) => {
        setUser(user)
        history.push("/choose-game")
      },
      (error) => {
        console.error(error)
      }
    )
  }

  render() {
    const { username, password } = this.state;
    return (
        <div>
        <h1>Login</h1>
          <form onSubmit={this.handleLogin}>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" value={username} required onChange={this.handleChange}/>
            <label htmlFor="password">Password: </label>
            <input type="password" value={password} name="password" required onChange={this.handleChange}/>
            <input type="submit" value="Login"/>
          </form>
          <Link to="/" onClick={this.logoutUser}>
            Logout
          
        </Link>
        </div>
    )
  }
}