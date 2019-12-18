import React, { Component } from "react";
import io from "socket.io-client";
import Sketch from "./Sketch";

const socket = io.connect("http://localhost:4000"); //development;

export default class tryCanvasReceive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      erased: false
    };
  }

  setup = p5 => {
    p5.createCanvas(400, 400).parent("pictionary");
    p5.background(255);
  };

  draw = p5 => {
    socket.on(
      "mouse",
      function(data) {
        p5.line(data.x, data.y, data.x1, data.y1);
        p5.strokeWeight(6);
        p5.frameRate(60);
      }
    );
  };

  render() {
    return (
      <div className='cel'>
        <div id='pictionary'>
          <Sketch setup={this.setup} draw={this.draw} sendmouse={this.sendmouse}></Sketch>
        </div>
      </div>
    );
  }
}
