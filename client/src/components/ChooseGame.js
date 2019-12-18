import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import NavBar from "./NavBar";


export default class ChooseGame extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: this.props.appState.user

    }
    this.authService = new AuthService();
    console.log(this.props.appState.user)
  }

  handleChange = e => {
    const { name, value } = e.target;
    // this.setState({[name]:value})
    this.props.setCategory({ [name]: value });
  };

  render() {
    return (
      <div className='full'>
      <NavBar props={this.props}></NavBar>
        <div className='flex center'>
        <h3>How skilled are you feeling?</h3>
        <div>
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
        </div>
       
    );
  }
}
