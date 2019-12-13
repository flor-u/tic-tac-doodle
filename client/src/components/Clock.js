
import React, { Component } from "react";
import Countdown, { zeroPad } from "react-countdown-now";


export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state={
completed: false,
    }
  }
  
  

  // Renderer callback with condition
  renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      // this.setState({completed:false})
    //  this.props.finishTime(true)
      return <span>Time is up!</span>;
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
    return <Countdown date={Date.now() + 5000} renderer={this.renderer} controlled={true}/>;
  }
}
