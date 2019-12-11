import React, { Component } from 'react'
import { Link } from "react-router-dom";
import AuthService from '../services/AuthService'

export default class Home extends Component {
    
    render() {
        return (
            <div>
                <h1>Home</h1>
                <button><Link to='/login'>
                Play
          </Link></button>
            </div>
        )
    }
}
