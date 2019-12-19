import React, { Component } from "react";
import io from "socket.io-client";
import SendCanvas from "./SendCanvas";
import Chat from "./Chat";
import Guess from "./Guess";
import NavBar from "./NavBar";

const connection = io.connect("http://localhost:4000");

export default class GameWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      user: null,
      category: this.props.category
    };

    this.socket = connection;

    this.socket.on("list", list => {
      console.log(list)
      this.setState({ ...this.state, userList: list });
    });
  }

  // Este método recibe un NickName del Input de la portada
  // Realiza un ".emit" al server para que lo añada a la lista de usuarios.
  // Nos redirije a "/chat"
  updateUserList = name => {
    // if (name.trim() !== "") {
    this.setState({ ...this.state, user: name }, () => {
      this.socket.emit("newUser", name);
      console.log(this.state);
      // this.props.history.push("/chat");
    });
    // }
  };

  

  //esto no esta bien
componentDidMount(){
  // console.log(this.props.user.username)
  this.updateUserList(this.props.username)
}
  //   componentDidMount(){
  //     console.log(this.props.user.username)
  // this.updateUserList(this.props.user.username)
  //   }

  render() {
    console.log(this.state)
    //conditional render if host or guest ? SendCanvas:Guess
    return (
      this.state.userList[0] === this.state.user ?
      <div className='full cel'>
        <NavBar props={this.props} socket={this.socket}></NavBar>
        <div className="flex center">
        <div>
        <SendCanvas socket={this.socket} user={this.state.user} props={this.props}></SendCanvas>
        </div>
        {/* <Guess socket={this.socket} list={this.state.userList} user={this.state.user} props={this.props}></Guess> */}
        <Chat socket={this.socket} list={this.state.userList} user={this.state.user}></Chat>
      </div>
      </div>
      :
      <div className='full cel'>
        <NavBar props={this.props}></NavBar>
        <div className="flex center">
        <div>
        {/* <SendCanvas socket={this.socket} list={this.state.userList} user={this.state.user} props={this.props}></SendCanvas> */}
        <Guess socket={this.socket}  user={this.state.user} props={this.props}></Guess>
        </div>
        <Chat socket={this.socket} list={this.state.userList} user={this.state.user}></Chat>
      </div>
      </div>

    );
  }
}
