import React, { Component } from "react";
import Doodle from "./Doodle";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.appState.user
    };
    console.log(this.state.user);
  }

//   deleteDoodle= (e, user, doodle) => {
//     e.preventDefault;
//     return console.log("about to delete this doodle");
//   };

  render() {
    return (
      <div className='flex cel'>
        <div>
          <h4>Hi, {this.state.user.username}</h4>
          <h3>Your saved doodles</h3>
        </div>
        <div className='gallery'>
          {this.state.user.doodles.map((doodle, idx) => {
            console.log(idx)
            return (
              <div key={idx} >
              
                <button 
                // onClick={(e, user, doodle) => this.deleteDoodle(e, this.state.user, this.props.doodle)}
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
