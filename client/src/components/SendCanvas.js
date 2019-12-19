import React, { Component } from "react";
import io from "socket.io-client";
import Sketch from "./Sketch";


// const socket = io.connect("http://localhost:4000"); //development;

export default class SendCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
    this.socket = this.props.socket;
  }


  //canvas//
  setup = p5 => {
    p5.createCanvas(500, 350)
    .parent("pictionary");
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

  //chat//

  render() {
    return (
        
        <div className='flex center'>
        <p>word</p>
          <div id='pictionary'>
            <Sketch setup={this.setup} draw={this.draw} sendmouse={this.sendmouse}></Sketch>
          </div>
        </div>
      // </div>
    );
  }
}
