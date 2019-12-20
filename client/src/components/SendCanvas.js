import React, { Component } from "react";
import Sketch from "./Sketch";
import Words from "../words.json";
import styled from "styled-components";

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
  padding: 0.4rem 0.7rem;
  box-shadow: 2rem 2rem transparentize(rgb(16, 24, 50), 1);
  transform-origin: rigth top;
  font-family: 'Nanum Pen Script', cursive;
  font-size: 1.6rem;
`;

export default class SendCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      words: [...Words],
      word: ""
    };

    this.socket = this.props.socket;
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
    this.setState({
      erased: true
    });
  };

  render() {
    return (
      <div className='flex center'>
        <ButtonWrapper>
        <h5 >Try drawing</h5>
        <div className='no-margin center'>
        <h4>{this.state.word}</h4>
        </div>
          <Button className='bg yel' onClick={this.erase}>
            x
          </Button>
        </ButtonWrapper>
        <div id='pictionary'>
          <Sketch setup={this.setup} draw={this.draw} sendmouse={this.sendmouse}></Sketch>
        </div>
      </div>
      // </div>
    );
  }
}
