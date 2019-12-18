import React, { Component } from "react";
import Doodle from "./Doodle";
import AuthService from "../services/AuthService";
import NavBar from "./NavBar";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.state = {
      user: this.props.appState.user
    };
    console.log(this.state);
  }

  deleteDoodle = e => {
    // e.preventDefault;
    let idx = e.target.value;
    console.log(e.target.value);
    let user = this.state.user;
    this.authService.deleteDoodle(user, idx).then(response => {
      this.setState({ ...this.state, user: response });
    });
    console.log(this.state);
  };

  componentDidMount = () => {
    this.updateDoodleList();
  };

  updateDoodleList = () => {
    this.authService
      .getAllDoodles()
      .then(doodles => this.setState({ doodles: doodles }))
      .catch(err => console.log("Error", err));
  };

  render() {
    return (
      <div className='full'>
        <NavBar props={this.props}></NavBar>
        <div className='flex'>
          <div>
            <h4>Hi, {this.state.user.username}</h4>
            <h3>Your saved doodles</h3>
          </div>
          <div className='gallery'>
            {this.state.user.doodles.map((doodle, idx) => {
              return (
                <div key={idx}>
                  <button value={idx} onClick={e => this.deleteDoodle(e)}>
                    X
                  </button>
                  <Doodle doodle={doodle} user={this.state.user} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
