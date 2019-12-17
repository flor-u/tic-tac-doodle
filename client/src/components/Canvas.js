import React, { Component } from "react";
import Sketch from "react-p5";
import {toBlob} from "canvas-to-blob"

import AuthService from "../services/AuthService";

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.state = {
      erased: false,
      serializedCanvas: null
    };
   
  }

  setup = p5 => {
    this.canvas = p5.createCanvas(600, 350).parent("canvas");
    p5.background(255);
    p5.strokeWeight(6);
    p5.frameRate(60);
  };


  draw = p5 => {
    let line = [];
    if (p5.mouseIsPressed === true) {
      line.push(p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY));
    }
    if (this.props.props.newRound){
      let image = this.canvas.elt.toDataURL("image/png")
      this.authService.upload({image});
    }
    if (this.state.erased) {
      let image = this.canvas.elt.toDataURL("image/png")
      this.authService.upload({image});
      p5.clear();
      p5.setup();
      this.setState({ erased: false });
    }
  };

  erase = e => {
    this.setState({
      erased: true
    });
  };


  render() {
    return (
      <React.Fragment>
        <div>
          <h1>Draw!</h1>
          <button onClick={e => this.erase(e)}>X</button>
          <div id='canvas'>
            <Sketch setup={this.setup} draw={this.draw} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
