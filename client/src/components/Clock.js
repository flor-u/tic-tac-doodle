
import React, { Component } from "react";
import Countdown, {zeroPad } from "react-countdown-now";


export default class Clock extends Component {
  constructor(props) {
    super(props);
    
    this.state={
completed: false,
    }
  }

  renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      this.props.onFinish()
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
    return (
    <div className="clock" >
    <Countdown 
    ref={this.props.refCallback} 
      date={Date.now() + 20000}
                intervalDelay={1}
                // zeroPadTime={2}
                autoStart={true}
                daysInHours
    // date={Date.now() + 20000} 
    renderer={this.renderer}/>
    </div>
    )
  }
}
