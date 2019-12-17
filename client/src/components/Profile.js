import React, { Component } from "react";
import Doodle from "./Doodle";
import AuthService from "../services/AuthService"

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService()
    this.state = {
      user: this.props.appState.user
    };
   
  }

  // deleteDoodle = (e) => {
  //   // e.preventDefault;
  //   let idx= e.target.value
  //   console.log(e.target.value)
  //   let user = this.state.user ;
  //   this.authService.deleteDoodle(user, idx)
  // };

  render() {
    return (
      <div className='flex cel'>
        <div>
          <h4>Hi, {this.state.user.username}</h4>
          <h3>Your saved doodles</h3>
        </div>
        <div className='gallery'>
          {this.state.user.doodles.map((doodle, idx) => {
           
            return (
              <div key={idx} >
                <button value={idx}
                // onClick={(e) => this.deleteDoodle(e)}
                >X</button>
                <Doodle doodle={doodle} user={this.state.user} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
