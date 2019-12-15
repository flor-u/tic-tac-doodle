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
          <h3>Level</h3>
          <button type='button' value='easy' name='category' onClick={this.handleChange}>
            Easy
          </button>
          <button type='button' value='medium' name='category' onClick={this.handleChange}>
            Medium
          </button>
          <button type='button' value='hard' name='category' onClick={this.handleChange}>
            Hard
          </button>
        </div>
        
        <div>
          <h3>Game type</h3>
          <button type='button' value='group' name='gameType' onClick={this.handleChange}>
            Group
          </button>
          <button type='button' value='solo' name='gameType' onClick={this.handleChange}>
            Solo
          </button>
        </div>
        <Link className="btn cta bg" to='/word-to-draw'>Go</Link>
      </div>
    );
  }
}
