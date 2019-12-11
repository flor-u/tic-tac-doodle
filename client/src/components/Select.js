import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from '../services/AuthService'

export default class Select extends Component {
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
        {/* <button>
          <Link to='/choose-game'>
            public
          </Link>
        </button> */}
        <button>
          <Link to='/draw'>
            Draw!
          </Link>
        </button>

        <Link to='/' onClick={this.logoutUser}>
          Logout
        </Link>
      </div>
    );
  }
}
