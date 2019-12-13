import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Canvas from "./Canvas";
import CountDown from "./CountDown";
import Clock from "./Clock";
import io from 'socket.io-client'

export default class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: { ...this.props.appState },
      newRound: false,
      word: ""
    };
    console.log(props);

    this.socket = io('http://192.168.96.69:4000')

    // Creamos un ".on", el cual escucha si el server envia una lista de usuarios 
    this.socket.on('list', list => {
      console.log(this.socket)
      this.setState({...this.state, userList: list})
    })
  }
  updateUserList=(name)=>{
    if(name.trim() !== ''){
      this.setState({...this.state, user: name},()=>{
        this.socket.emit('newUser', name)
        // this.props.history.push('/chat')
      })
    }
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
