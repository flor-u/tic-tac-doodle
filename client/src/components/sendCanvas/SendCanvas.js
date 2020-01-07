import React, { Component } from "react";
import Sketch from "../Sketch";
import Words from "../../words.json";
import Clock from "../Clock";
import './send.css'



export default class SendCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      words: [...Words],
      word: "",
      erased: false
    };

    this.socket = this.props.socket;
    this.setClockRef = this.setClockRef.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
  }

  //clock//
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
    let resetCanvas = !this.state.erased
    this.wordList();
    this.setState({
        erased: true
      });
  }

  //canvas//
  setup = p5 => {
    p5.createCanvas(500, 350).parent("pictionary");
    p5.background(255);
  };

  draw = p5 => {
    let line = [];
    if (p5.mouseIsPressed === true) {
      line.push(p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY));
      p5.strokeWeight(6);
      p5.frameRate(60);
      this.sendmouse(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY); // Nothing
    }
    if (this.state.erased) {
      console.log('a')
      let erase= true;
      p5.clear();
      p5.setup();
      this.setState({ erased: false });
      this.socket.emit('delete-canvas', erase)
    }
  };

  sendmouse = (xpos, ypos, x1, y1) => {
    var data = {
      x: xpos,
      y: ypos,
      x1: x1,
      y1: y1
    };
    this.socket.emit("mouse", data);
  };

  wordList = () => {
    let category = [...this.state.words[0].medium];
    let word = category[Math.floor(Math.random() * category.length)];
    this.setState({ word: word });
  };

  componentDidMount() {
    this.wordList();
  }


  render() {
    return (
      <div className='canvas-placement'>
        <div className='button-wrapper'>
          <div className=''>
            <h4> draw: <span>{this.state.word}</span></h4>
          </div>
          <div className='third'>
            <Clock onFinish={() => this.onFinish()} refCallback={this.setClockRef} time='100'></Clock>
          </div>

          <div className='third'>
            <button className='start-button bg yel' onClick={this.start}>
              start
            </button>
          </div>
        </div>
        <div id='pictionary'>
          <Sketch setup={this.setup} draw={this.draw} sendmouse={this.sendmouse}></Sketch>
        </div>
      </div>
    );
  }
}
