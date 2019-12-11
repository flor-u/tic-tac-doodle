import React, { Component } from "react";
import Words from "../words.json";
import { Link } from "react-router-dom";
import Navigation from "./NavBar.js";

export default class ChooseCard extends Component {
  constructor() {
    super();

    this.state = {
      words: [...Words]
    };
  }
  render() {
    console.log(this.state.words);
    return (
      <div>
      <Navigation></Navigation>
        {Object.keys(this.state.words[0]).map((arr, idx)=>{
                  
                  return <Link key={idx} to='/select'>{arr} </Link>
                })} 

        <button>{}</button>
      </div>
    );
  }
}
