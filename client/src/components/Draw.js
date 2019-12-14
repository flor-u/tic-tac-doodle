import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Canvas from "./Canvas";
import CountDown from "./CountDown";
import Clock from "./Clock";
import io from 'socket.io-client'
import GuessCanvas from "./GuessCanvas";
import { Row, ListGroup, Col, Container} from 'react-bootstrap'
import GuessInput from "./GuessInput";

export default class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: { ...this.props.appState },
      newRound: false,
      // word: "",
      messages: [],
      userList : [],
      user: this.props.appState.user.username
    };
    console.log(this.props.appState.user.username);

    this.socket = io('http://192.168.96.69:4000')

    // Creamos un ".on", el cual escucha si el server envia una lista de usuarios 
    this.socket.on('list', list => {
      console.log(this.socket)
      this.setState({...this.state, userList: list})
    })

    this.socket.on("newMessage", message => {
      let mess = this.state.messages;
      mess.push(message);
      this.setState({ ...this.state, messages: mess });
    });
  }

  updateUserList=(name)=>{
    if(name.trim() !== ''){
      this.setState({...this.state, user: name},()=>{
        this.socket.emit('newUser', name)
        // this.props.history.push('/chat')
        console.log('list', this.state.userList)
      })
    }
  }

  sendMessage = text => {
    if(text.trim()==="")return
    let mess = {
      text: text,
      user: this.props.appState.user.username
    };
    // Este ".emit" le envia al server los mensajes que escribamos
    // El server se encargará de propagarlos
    this.socket.emit("messageSent", mess);
  };

  onFinish() {
    this.setState({
      ...this.state,
      newRound: true
    });
  }

  // componentDidMount=()=>{
  //   this.updateUserList()
  //   console.log('a')
  // }
  // componentDidUpdate=()=>{
  //   document.getElementById('chatBox').scrollTop = document.getElementById('chatBox').scrollHeight
  // }

  render() {
    if (this.state.newRound) {
      return <Redirect to='/word-to-draw/' />;
    }
    return (
      <React.Fragment>
        <Clock onFinish={() => this.onFinish()}></Clock>
        <div>
        {/* <CountDown finishTime={data =>this.handleChange(data)}></CountDown> */}
        <Canvas props={this.props}></Canvas>
        </div>
              <Col sm={6} id="userList">
            <h5>ACTIVE USERS:</h5>
            <ListGroup>
              {this.state.userList.map((elem, idx) => {
                return elem===this.props.appState.user.username ?
                  <ListGroup.Item key={idx}><b>{elem}</b></ListGroup.Item>
                  :
                  <ListGroup.Item key={idx}>{elem}</ListGroup.Item>
              })}
            </ListGroup>
          </Col>
              <Col sm={6}>
            <div className="chatBox" id="chatBox">
              {this.state.messages.map((elem, idx) => {
                return (
                  <h6 key={idx}>
                    {elem.user} : {elem.text}
                  </h6>
                );
              })}
            </div>

            {/* Input para nuevos mensajes */}
            <div className="textForm">
            
              <GuessInput info={this.sendMessage}></GuessInput>
            </div>
          </Col>

        {/* <GuessCanvas></GuessCanvas> */}
      </React.Fragment>
    );
  }
}
