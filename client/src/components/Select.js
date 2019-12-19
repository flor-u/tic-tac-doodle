import React, { Component } from "react";
import { Link } from "react-router-dom";

import NavBar from "./NavBar";


export default class Select extends Component {
  constructor(props) {
    super(props);
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.props.setCategory({ [name]: value });
  };
  render() {
    return (
      <div className='full'>
        <NavBar props={this.props}></NavBar>
        <div className='flex center'>
          <h3>Game type</h3>
          <div>
            <button className='btn cta bg' type='button' value='solo' name='category' onClick={this.handleChange}>
              <Link to='/choose-game'>Solo</Link>
            </button>
            <button className='btn cta bg' type='button' value='group' name='category' onClick={this.handleChange}>
              <Link to='/game'>Group</Link>
            </button>
            {/* <button className="btn cta bg" type='button' value='hard' name='category' onClick={this.handleChange}>
          <Link to="/word-to-draw">Difficult</Link> 
          </button> */}
          </div>
        </div>
      </div>
    );
  }
}
