import React, { Component } from "react";
import io from "socket.io-client";
import Sketch from "./Sketch";

const socket = io.connect("http://localhost:4000"); //development;

export default class tryCanvasSend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      erased: false
    };
  }

  setup = p5 => {
    p5.createCanvas(400, 400).parent("pictionary");
    p5.background(255);
    // Start a socket connection to the server

    // Some day we would run this server somewhere else
    // We make a named event called 'mouse' and write an
    // anonymous callback function
    socket.on(
      "mouse",
      // When we receive data
      function(data) {
        console.log("Got: " + data.x + " " + data.y);
        // Draw a blue circle
        p5.fill(0);
        p5.noStroke();
        p5.ellipse(data.x, data.y, 6, 6);
        p5.frameRate(60);
      }
    );
  };

  draw = (p5) => {
    if (p5.mouseIsPressed === true){
    p5.fill(245);
    p5.noStroke();
    p5.ellipse(p5.mouseX, p5.mouseY, 6, 6);
    p5.frameRate(60);
    // Send the mouse coordinates
    this.sendmouse(p5.mouseX, p5.mouseY);// Nothing
  };}

//   mouseDragged = p5 => {
//     // Draw some white circles
//     p5.fill(255);
//     p5.noStroke();
//     p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
//     // Send the mouse coordinates
//     this.sendmouse(p5.mouseX, p5.mouseY);
//   };

  sendmouse = (xpos, ypos) => {
    // We are sending!
    console.log("sendmouse: " + xpos + " " + ypos);

    // Make a little object with  and y
    var data = {
      x: xpos,
      y: ypos
    };

    // Send that object to the socket
    socket.emit("mouse", data);
  };

  render() {
    return (
        <div className="cel">
      <div id='pictionary'>
        <Sketch setup={this.setup} draw={this.draw} sendmouse={this.sendmouse}></Sketch>
      </div>
      </div>
    );
  }
}
