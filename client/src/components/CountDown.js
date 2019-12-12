import React from "react";
import { zeroPad } from "react-countdown-now";

export default class CountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        time: {}, 
        seconds: 5,
        timeFinish: false
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);

    console.log(this.props);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };

    return obj;
  }

  // handleChange = (e) => {

  //     const { name, value } = e.target;
  //     // this.setState({[name]:value})
  //     this.props.finishTime({[name]:value})

  //   }

  componentDidMount() {
    let timeLeft = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeft });
  }


  startTimer() {
    console.log('a');
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
      console.log('b')
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let gameTime = this.state.seconds;
    let seconds = gameTime - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    // Check if we're at zero.
    if (this.state.seconds === 0) {
      clearInterval(this.timer);
      console.log(this.state);
      this.props.finishTime({ timeFinish: this.state.timeFinish });
      this.timer=0;
      this.setState({...this.state,  seconds: 5});
      // this.setState({ seconds: 5, timeFinish: true });

      console.log(this.state, this.timer);
      
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.startTimer}>Start</button>
        <span>
          {zeroPad(this.state.time.m)}:{zeroPad(this.state.time.s)}
        </span>
      </div>
    );
  }
}
