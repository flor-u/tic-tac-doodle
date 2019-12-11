import React, { Component } from 'react'
import { Link } from "react-router-dom";
import AuthService from '../services/AuthService'
import ChooseCard from './chooseCard';

export default class Choose extends Component {
    constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    username: '',
    password: ''
  }

    render() {
        return (
            <div>
            <ChooseCard></ChooseCard>
            <button>
          <Link to='/select'>
            Choose game
          </Link>
        </button>
                <Link to='/' onClick={this.logoutUser}>
          Logout
        </Link>
            </div>
        )
    }
}
