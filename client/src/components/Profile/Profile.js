import React, { Component } from "react";
import Doodle from "../Doodle";
import AuthService from "../../services/AuthService";
import NavBar from "../NavBar/NavBar";
import styled from 'styled-components'
import './profile.css'

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
    let user = this.state.user;
    this.authService.deleteDoodle(user, idx)
    .then(response => {
      this.setState({ ...this.state, user: response });
    });
  };

  componentWillMount = () => {
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
      <div className='container'>
        <NavBar props={this.props}></NavBar>
        <div className='home'>
          <div>
            <h2>Hi, {this.state.user.username}</h2>
            <h5><a className='doodles-link' href="" onClick={()=> this.updateDoodleList()}>Your saved doodles</a></h5>
          </div>
          <div className='gallery'>
            {this.state.user.doodles.map((doodle, idx) => {
              return (
                <div key={idx}>
                  
                  <Doodle doodle={doodle} user={this.state.user} />
                  <button className='bg yel' value={idx} onClick={e => this.deleteDoodle(e)}>
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
