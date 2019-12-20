import React, { Component } from "react";
import io from "socket.io-client";
import SendCanvas from "./SendCanvas";
import Chat from "./Chat";
import Guess from "./Guess";
import NavBar from "./NavBar";
import styled from "styled-components";

const Button = styled.button`
  border: 3px rgb(16, 24, 50) solid;
  outline: none;
  cursor: pointer;
  min-width: 2rem;
  padding: 0.5rem 1rem;
  box-shadow: 2rem 2rem transparentize(rgb(16, 24, 50), 1);
  transform-origin: rigth top;
  font-family: 'Nanum Pen Script', cursive;
  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: 0.05rem;

  &:active{
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
      console.log(list);
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

    console.log(this.state);
    return this.state.userList[0]=== this.state.user ? (
      <div className='full cel'>
        <NavBar props={this.props}></NavBar>
        <div className='center'>
          <div>
            <SendCanvas socket={this.socket} user={this.state.user} props={this.props}></SendCanvas>
          </div>
          {/* <Guess socket={this.socket} list={this.state.userList} user={this.state.user} props={this.props}></Guess> */}
          <div>
            {" "}
            <Chat socket={this.socket} list={this.state.userList} user={this.state.user}></Chat>
           
          </div>
          <Button onClick={(e)=>{this.removeUser(e)}}>Leave Game</Button>
        </div>
      </div>
    ) : (
      <div className='full cel'>
        <NavBar props={this.props}></NavBar>
        <div className='center'>
          <div>
            {/* <SendCanvas socket={this.socket} list={this.state.userList} user={this.state.user} props={this.props}></SendCanvas> */}
            <Guess socket={this.socket} user={this.state.user} props={this.props}></Guess>
          </div>
          <Chat socket={this.socket} list={this.state.userList} user={this.state.user}></Chat>
         
        </div>
        <Button onClick={(e)=>{this.removeUser(e)}}>Leave Game</Button>
      </div>
    );
  }
}
