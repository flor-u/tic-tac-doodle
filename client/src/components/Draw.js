import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Canvas from "./Canvas";
import CountDown from "./CountDown";
import Clock from "./Clock";

export default class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: { ...this.props.appState },
      newRound: false,
      word: ""
    };
    console.log(props);
  }

  onFinish() {
    this.setState({
      ...this.state,
      newRound: true
    });
  }

  render() {
    if (this.state.newRound) {
      return <Redirect to='/word-to-draw/' />;
    }
    return (
      <React.Fragment>
        <Clock onFinish={() => this.onFinish()}></Clock>
        {/* <CountDown finishTime={data =>this.handleChange(data)}></CountDown> */}

        <Canvas></Canvas>
      </React.Fragment>
    );
  }
}
