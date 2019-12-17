import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import Navigation from "./NavBar";
import { Navbar } from "react-bootstrap";

export default class ChooseGame extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  handleChange = e => {
    const { name, value } = e.target;
    // this.setState({[name]:value})
    this.props.setCategory({ [name]: value });
  };

  render() {
    return (
      <div>
      <Navbar></Navbar>
        <div>
        <h3>How skilled are you feeling?</h3>
          <button className="btn cta bg" type='button' value='easy' name='category' onClick={this.handleChange} >
            <Link to="/word-to-draw">Easy</Link>
          </button>
          <button className="btn cta bg" type='button' value='medium' name='category' onClick={this.handleChange}>
            <Link to="/word-to-draw">Medium</Link>
          </button>
          <button className="btn cta bg" type='button' value='hard' name='category' onClick={this.handleChange}>
          <Link to="/word-to-draw">Difficult</Link> 
          </button>
        </div>
        </div>
       
    );
  }
}
