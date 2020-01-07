import React, { Component } from "react";
import io from "socket.io-client";
import Sketch from "./Sketch";
import './sendCanvas/send.css'


// const socket = io.connect("http://localhost:4000");

export default class Guess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      erased: ''
    };
    this.socket = this.props.socket;

      this.socket.on('delete-canvas', erase=>{
        console.log('b')
        this.setState({
          erased: erase
        });
      }
      
      )
  }
  //canvas//

  setup = p5 => {
    p5.createCanvas(500, 350)
    .parent("guess");
    p5.background(255);
  };

  draw = p5 => {
    this.socket.on("mouse", function(data) {
      p5.line(data.x, data.y, data.x1, data.y1);
      p5.strokeWeight(6);
      p5.frameRate(60);
    });
  };

  
  //chat//

  render() {
    return (
        <div className='canvas-placement'>
        <div className="button-wrapper"></div>
          <div id='guess'>
            <Sketch setup={this.setup} draw={this.draw} sendmouse={this.sendmouse}></Sketch>
          </div>
        </div>
    );
  }
}
