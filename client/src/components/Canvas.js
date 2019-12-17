import React, { Component } from "react";
// import Sketch from "react-p5";
import Clock from "./Clock";
import AuthService from "../services/AuthService";
import Sketch from "./Sketch";

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.state = {
      erased: false,
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

    if (this.state.erased) {
      p5.clear();
      p5.setup();
      this.setState({ erased: false });
    }
  };

  save = e => {
    e.preventDefault();
    let image = this.canvas.elt.toDataURL("image/png");
    this.authService.upload({ image });
  };

  erase = e => {
    this.setState({
      erased: true
    });
  };


  render() {
    console.log("rendered");
    return (
      <React.Fragment>
        <div>
          <button onClick={this.save}>save</button>
          <button onClick={this.erase}>X</button>
          <div id='canvas'>
            <Sketch setup={this.setup} draw={this.draw} clear={this.clear}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
