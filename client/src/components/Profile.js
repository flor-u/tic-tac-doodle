import React, { Component } from "react";
import Doodle from "./Doodle";
import AuthService from "../services/AuthService";
import NavBar from "./NavBar";
import styled from 'styled-components'

const Button= styled.button`
border: 3px rgb(16, 24, 50) solid;
outline: none;
  cursor: pointer;
  min-width: 2rem;
  padding: .4rem .7rem;
  margin: auto 2rem;
  box-shadow: 2rem 2rem transparentize(rgb(16, 24, 50), 1);
  transform-origin: rigth top;
`
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
                  
                  <Doodle doodle={doodle} user={this.state.user} />
                  <Button className='bg yel' value={idx} onClick={e => this.deleteDoodle(e)}>
                    X
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
