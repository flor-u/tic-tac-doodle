import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";
import AuthService from '../services/AuthService'

class Navigation extends Component {

    constructor(props) {
        super(props)
        this.authService = new AuthService();

    }

    logoutUser = () => {
        this.authService.logout()
            .then(x => this.props.setUser(false))
            .then(x=> this.props.setCategory({category: '', gameType:''}))
            .catch(err => console.log(err))
    }

    render() {

        // const saludo = this.props.loggedInUser ? this.props.loggedInUser.username : 'invitado'

        return (

            // this.props.loggedInUser ?

                        <Nav className="mr-auto">
                            <Nav.Link as="li"><Link to="/">Home</Link></Nav.Link>
                            <Nav.Link as="li"><Link to="/profile">Profile</Link></Nav.Link>
                            <Nav.Link as="li"><Link to="/"  onClick={this.logoutUser}>Logout</Link></Nav.Link>
                        </Nav>
                        
             
        )
    }
}

export default Navigation