import React, { Component } from "react";
import io from "socket.io-client";
import SendCanvas from "./sendCanvas/SendCanvas";
import Chat from "./Chat";
import Guess from "./Guess";
import NavBar from "./NavBar/NavBar";
import styled from "styled-components";

const Button = styled.button`
background-color:#C2EFF5;
  border: 3px rgb(16, 24, 50) solid;
  outline: none;
  cursor: pointer;
  min-width: 3.2rem;
  padding: 0.8rem 1.6rem;
  box-shadow: 3.2rem 3.2rem transparentize(rgb(16, 24, 50), 1);
  transform-origin: rigth top;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.4rem;
    font-weight: 500;
  &:hover{
    background-color:#FDED01;
  }

  &:active{
    background-color:#FDED01;
    transform: translateY(4px);
    box-shadow: 0 1px rgb(16, 24, 50);}
`;

export default class GameWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      user: null,
      userID:null,
      category: this.props.category    
    };

    this.socket = io.connect("https://tic-tac-doodle.herokuapp.com/");

    this.socket.on("list", list => {
      this.setState({ ...this.state, userList:list});
    });
  }
  
  updateUserList = name => {
    this.setState({ ...this.state, user: name }, () => {
      this.socket.emit("newUser", name);
      console.log(this.state);
    });
  };

  removeUser=(e)=>{
    e.preventDefault()
    let name =  this.state.user;
    this.socket.emit('out', name)
    this.props.history.push("/select")
  }

  componentDidMount=()=> {
    this.updateUserList(this.props.username)
  }

  render() {
    return this.state.userList[0]=== this.state.user ? (
      <div className='full'>
        <NavBar props={this.props}></NavBar>
        <div className='center'>
            <SendCanvas socket={this.socket} user={this.state.user} props={this.props}></SendCanvas>
          <div className='chat'>
            <Chat socket={this.socket} list={this.state.userList} user={this.state.user}></Chat>
          </div>
          <Button onClick={(e)=>{this.removeUser(e)}}>leave game</Button>

        </div>
      </div>
    ) : (
      <div className='full'>
        <NavBar props={this.props}></NavBar>
        <div className='center'>
          <div>
            <Guess socket={this.socket} user={this.state.user} props={this.props}></Guess>
          </div>
          <div className='chat'>
          <Chat socket={this.socket} list={this.state.userList} user={this.state.user}></Chat>
        </div>
        <Button onClick={(e)=>{this.removeUser(e)}}>leave game</Button>
      </div>
      </div>
    );
  }
}
