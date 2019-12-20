import React, { Component } from "react";
import io from "socket.io-client";
import SendCanvas from "./SendCanvas";
import Chat from "./Chat";
import Guess from "./Guess";
import NavBar from "./NavBar";


export default class GameWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      user: null,
      userID:null,
      category: this.props.category
      
    };
    this.socket = io.connect("http://localhost:4000");


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
          <button onClick={(e)=>{this.removeUser(e)}}>Leave Game</button>
        </div>
      </div>
    );
  }
}
