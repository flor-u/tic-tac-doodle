import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import Navigation from "./NavBar";

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
        <div>
          <h2>Who are you</h2>
          <h2>playing with?</h2>
          <Link className="btn cta bg" to='/word-to-draw'>Solo</Link>
          <Link className="btn cta bg" to='/word-to-draw'>Group</Link>

          {/* <button className="btn cta bg" type='button' value='group' name='gameType' onClick={this.handleChange}>
            Group
          </button>
          <button className="btn cta bg" type='button' value='solo' name='gameType' onClick={this.handleChange}>
            Solo
          </button> */}
        </div>
        
      </div>
    );
  }
}
