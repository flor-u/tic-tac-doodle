import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Canvas from "./Canvas";
import Clock from "./Clock";
import AuthService from "../services/AuthService";

export default class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: { ...this.props.appState },
      newRound: false,
      word: "",
      user: this.props.appState.user.username
    };
    this.authService = new AuthService();
    this.setClockRef = this.setClockRef.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
  }

  start() {
    this.clockRef.start();
  }

  pause() {
    this.clockRef.pause();
  }

  setClockRef(ref) {
    this.clockRef = ref;
  }
  onFinish() {
    //function to send info to canvas

    this.setState({
      ...this.state,
      newRound: true
    });
  }

  //function to send info to canvas(){
  //   time is finished
  // }

  // function to receive info from canvas(){
  //  ready, now you can set your state
  // this.setState({
    //   ...this.state,
    //   newRound: true
    // });
  // }


  render() {
    if (this.state.newRound) {
      return <Redirect to='/word-to-draw' />;
    }
    return (
      <div className='cel'>
        <Clock onFinish={() => this.onFinish()} refCallback={this.setClockRef} time='100'></Clock>
        <button onClick={this.start}>Start Clock</button>
        <button onClick={this.pause}>Pause Clock</button>
        <div>
          <Canvas props={this.state} ></Canvas>
        </div>
      </div>
    );
  }
}
