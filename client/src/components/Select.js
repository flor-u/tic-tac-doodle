import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from '../services/AuthService'

export default class Select extends Component {
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
      <h3>Game type</h3>
      <button type='button' value="group" name="gameType" 
      onClick={this.handleChange}>
      Group
      </button>
       <button type='button' value="solo" name="gameType" 
      onClick={this.handleChange}
      >Solo</button>
        <Link to='/draw'>Go</Link>
      </div>
    
    );
  }
}
