import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import './navbar.css';



export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    console.log(this.props)
  
  }

  
  logoutUser = () => {
    this.authService
      .logout()
      .then(x => this.props.setUser(false))
      .then(x => this.props.setCategory({ category: "", gameType: "" }))
      
      .catch(err => console.log(err));
  };

  render() {
      const path= this.props.props.match.path

    return (
      path === '/profile' ?
      <header>
        <ul>
          <li>
            <Link to='' onClick={() => this.props.props.history.goBack()}>
              back
            </Link>
          </li>
          <li>
            <Link to='/select'>
              play
            </Link>
          </li>
          <li>
            <Link to='/' onClick={this.logoutUser}>
              logout
            </Link>
          </li>
        </ul>
      </header>
      
      :

      <header>
        <ul>
          <li>
            <Link to='' onClick={() => this.props.props.history.goBack()}>
              back
            </Link>
          </li>
          <li>
            <Link to='/profile'>
              profile
            </Link>
          </li>
          <li>
            <Link to='/' onClick={this.logoutUser}>
              logout
            </Link>
          </li>
        </ul>
      </header>
    );
  }
}

