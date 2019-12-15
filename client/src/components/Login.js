import React, { Component } from 'react'
import AuthService from '../services/AuthService'
import { Link } from "react-router-dom";
// import { Form, Card, CardTitle } from '../../styles/card';

export default class Login extends Component {
  constructor(props) {
    super(props);
    // console.log(props)
    this.authService = new AuthService();
  }

  state = {
    username: '',
    password: ''
  }

//   sendChangeToApp= (e) => {
//     const { key, value } = e.target;
//     return this.props.changeApp(key,value)
// }
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
   console.log(this.state)
    const { username, password } = this.state;
    return (
        <div>
        <h1>Login</h1>
          <form onSubmit={this.handleLogin}>
            <label htmlFor="username">username </label>
            <input type="text" name="username" value={username} required onChange={this.handleChange}/>
            <label htmlFor="password">password </label>
            <input type="password" value={password} name="password" required onChange={this.handleChange}/>
            <button className="btn cta bg" type="submit" value="Login">Login</button>
          </form>
        </div>
    )
  }
}