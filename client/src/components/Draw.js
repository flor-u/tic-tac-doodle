import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Canvas from "./Canvas";
import Clock from "./Clock";


export default class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: { ...this.props.appState },
      newRound: false,
      word: "",
      user: this.props.appState.user.username
    };
    
  }


  onFinish() {
    this.setState({
      ...this.state,
      newRound: true
    });
  }


  render() {
    if (this.state.newRound) {
      return <Redirect to='/word-to-draw' />;
    }
    return (
      <div className='cel'>
        <Clock onFinish={() => this.onFinish()}></Clock>
        <div>
        <Canvas props={this.state} ></Canvas>
        </div>
      </div>
    );
  }
}
