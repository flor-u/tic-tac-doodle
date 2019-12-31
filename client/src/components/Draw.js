import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Canvas from "./Canvas";
import Clock from "./Clock";
import AuthService from "../services/AuthService";
import NavBar from "./NavBar/NavBar";

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
    let promise = new Promise( (resolve, reject) => {
      let finish = true
      if (finish) {
       resolve(
         this.getImage());
      }
      else {
       reject(Error("Promise rejected"));
      }
     });
promise.then(result =>{
  this.setState({...this.state,newRound: true });}
  , function(error) {
   console.log(error);
})
    
  }

getImage(image){
  if(image === undefined){
    return
  } else {
    this.authService.upload({image});
  }
}

  render() {
    if (this.state.newRound) {
      return <Redirect to='/word-to-draw' />;
    }
    return (
      <div className='full cel'>
      <NavBar props={this.props}></NavBar>
      <div className='flex center'>
        <Clock onFinish={() => this.onFinish()} refCallback={this.setClockRef} time='100'></Clock>
        {/* <button onClick={this.start}>Start Clock</button>
        <button onClick={this.pause}>Pause Clock</button> */}
        <div>
          <Canvas props={this.state} image={(image) => this.getImage(image)}></Canvas>
        </div>
        </div>
      </div>
    );
  }
}
