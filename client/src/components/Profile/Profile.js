import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import NavBar from "../NavBar/NavBar";
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
      <div className='containerB'>
        <NavBar props={this.props}></NavBar>
        <div className='profile'>
          <div>
            <h2>Hi, {this.state.user.username}</h2>
            <h5><a className='doodles-link' href="#" onClick={()=> this.updateDoodleList()}>Your saved doodles</a></h5>
          </div>
          <div className='gallery'>
            {this.state.user.doodles.map((doodle, idx) => {
              return (
                <div key={idx} className='doodleCard'>
                  <button className='' value={idx} onClick={e => this.deleteDoodle(e)}>
                  <svg width="12px" height="12px" viewBox="0 0 16 16" version="1.1"><title>close</title><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill="#00f9bd"><polygon points="9.88283659 8 15.983556 14.1234568 14.0924974 16 7.99177801 9.89300412 1.89105858 16 0 14.1234568 6.10071942 8 0 1.89300412 1.89105858 0 7.99177801 6.10699588 14.1089414 0 16 1.87654321"></polygon></g></g></svg>
                  </button>
                  <img src={doodle} alt=""/>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
