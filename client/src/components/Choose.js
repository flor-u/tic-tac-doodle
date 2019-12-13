import React, { Component } from 'react'
import { Link } from "react-router-dom";
import AuthService from '../services/AuthService'
import Navigation from './NavBar';


export default class Choose extends Component {
    constructor(props) {
    super(props);
    this.authService = new AuthService();
    
  }


  handleChange = (e) => {
  
    const { name, value } = e.target;
    // this.setState({[name]:value})
    this.props.setCategory({[name]:value})

  }


    render() {
        return (
            <div>
            <div>
            <h3>Level</h3>
            <button type='button' value="easy" name="category" 
            onClick={this.handleChange}>Easy</button>
             <button type='button' value="medium" name="category" 
            onClick={this.handleChange}
            >Medium</button>
             <button type='button' value="hard" name="category" 
            onClick={this.handleChange}
            >Hard</button>
            </div>
            <div>
            <h3>Theme</h3>
            <button type='button' value="objects" name="category" 
            onClick={this.handleChange}
            >Objects</button>
             <button type='button' value="persons" name="category" 
            onClick={this.handleChange}
            >Persons</button>
             <button type='button' value="actions" name="category" 
            onClick={this.handleChange}
            >Actions</button>
            </div>
            <Link to='/select'>Go</Link>
                
            </div>
        )
    }
}
