
import React, { Component } from "react";
import Countdown, { zeroPad } from "react-countdown-now";


export default class Clock extends Component {
  constructor(props) {
    super(props);
  }
  // Random component
  

  // Renderer callback with condition
  renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <span>You are good to go!</span>;
    } else {
      // Render a countdown
      return (
        <span>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  render() {
    return <Countdown date={Date.now() + 5000} renderer={this.renderer} />;
  }
}
