import React, { Component } from "react";
import InputGuess from "./InputGuess";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      messages: [],
      userList:this.props.list
    };

    this.socket = this.props.socket;

    this.socket.on("newMessage", message => {
      let mess = this.state.messages;
      mess.push(message);
      this.setState({ ...this.state, messages: mess });
    });
  }


  sendMessage = text => {
    if (text.trim() === "") return;
    let mess = {
      text: text,
      user: this.props.user
    };
    this.socket.emit("messageSent", mess);
  };

  componentDidUpdate() {
    document.getElementById("chatBox").scrollTop = document.getElementById("chatBox").scrollHeight;
   
  };


  render() {
  // let users=[...new Set(this.props.list)]
    return (
      <div id='cont' className='flex'>
        {/* Lista de usuarios */}
        <div className='flex2'>
          <h5>Players</h5>
          <ul className='chatBox'>
            {this.props.list.map((elem, idx) => {
              return elem === this.props.user ? (
                <li key={idx}>
                  <b>{elem}</b>
                </li>
              ) : (
                <li key={idx}>{elem}</li>
              );
            })}
          </ul>
        </div>

        {/* Box que contiene el chat */}
        <div className='flex2'>
        <h5>What's the word?</h5>
          <div className='chatBox' id='chatBox'>
            {this.state.messages.map((elem, idx) => {
              return (
                <h6 key={idx}>
                  {elem.user} : {elem.text}
                </h6>
              );
            })}
          </div>

          {/* Input para nuevos mensajes */}
          <div className='flex2'>
            <InputGuess info={this.sendMessage}></InputGuess>
          </div>
        </div>
      </div>
    );
  }
}
