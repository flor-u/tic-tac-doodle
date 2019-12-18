import React, { Component } from 'react'
// import PageTitle from '../../fontStyles/PageTitle'
import AuthService from '../services/AuthService'
// import { Card, CardTitle, Form } from '../../styles/card';

export default class Access extends Component {
  constructor(props) {
    super(props)
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
  handleSignUp = (e) => {
    e.preventDefault()
    const { history, setUser } = this.props;
    this.authService.signup(this.state)
    .then(
      (user) => {
        setUser(user);
        history.push("/choose-game")
      },
      (error) => {
        console.error(error)
      }
    )
  }

  handleUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append('image', e.target.files[0])
    this.authService.upload(uploadData)
    .then(
      (data) => {
        this.setState({...this.state, image: data.secure_url})
      },
      (error) => {
        console.error(error)
      }
    )
  }

  render() {
    const { username, password} = this.state;
    return (
      <div className="full">
        <div className='flex center'>
      <h2>Sign Up</h2>
        <form onSubmit={this.handleSignUp} className='flex'>
          <label htmlFor="username">username </label>
          <input className='margin-bottom' type="text" name="username" value={username} required onChange={this.handleChange}/>
          <label htmlFor="password">password </label>
          <input className='margin-bottom'type="password" value={password} name="password" required onChange={this.handleChange}/>
          <button className="btn cta bg" type="submit" value="Create account">Create account</button>
        </form>
      </div>
      </div>
    )
  }
}
