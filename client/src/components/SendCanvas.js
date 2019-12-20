import React, { Component } from "react";
import Sketch from "./Sketch";
import Words from "../words.json";
import styled from "styled-components";
import Clock from "./Clock";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  width: 100%;
`;

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

  erase = e => {
    e.preventDefault();
    // this.setState({
    //   erased: true
    // });
  };

  render() {
    return (
      <div className='flex center'>
        <ButtonWrapper>
          {/* <h5 >Try drawing</h5> */}
          <div className='third'>
            <h4>{this.state.word}</h4>
          </div>
          <div className='third'>
            <Clock onFinish={() => this.onFinish()} refCallback={this.setClockRef} time='100'></Clock>
          </div>

          <div className='third'>
            <Button className='bg yel' onClick={this.start}>
              Start
            </Button>
            {/* <Button className='bg yel' onClick={(e) => this.erase(e)}>
            x
          </Button> */}
          </div>
        </ButtonWrapper>
        <div id='pictionary'>
          <Sketch setup={this.setup} draw={this.draw} sendmouse={this.sendmouse}></Sketch>
        </div>
      </div>
    );
  }
}
