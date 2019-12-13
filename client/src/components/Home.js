import React, { Component } from 'react'
import { Link } from "react-router-dom";
import AuthService from '../services/AuthService'

export default class Home extends Component {
    
    render() {
        return (
            <div>
                <h1>Here</h1>
                <h3> i will explain how the game works</h3>
                <button><Link to='/signup'>
                Sign Up
          </Link></button>
          <button><Link to='/login'>
                Log In
          </Link></button>
            </div>
        )
    }
}
