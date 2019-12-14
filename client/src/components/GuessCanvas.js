import React, { Component } from "react";
import Sketch from "react-p5";
// import {toBlob} from "canvas-to-blob"

export default class GuessCanvas extends Component {
  constructor() {
    super();
    this.state = {
      erased: false,
      serializedCanvas: null
    };
  }

  setup = p5 => {
    this.canvas = p5.createCanvas(800, 450);
    p5.background(230);
    p5.strokeWeight(6);
    // p5.stroke(234);
    p5.frameRate(60);
  };

  draw = p5 => {
//       let line=[];
//     if (p5.mouseIsPressed === true) {
//      line.push(p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY));
//     //  console.log(this.canvas)

//     this.canvas.elt.toBlob(function(blob) {
     
//       // console.log(blob)
//     })

//     //  console.log(line);
//     //  console.log(line.length)
//     }

//     if (this.state.erased) {
// //         let to_save = p5.get(0, 0, 800, 450); 
// // to_save.save("saved_name.png");
//       p5.clear();
//       p5.setup();
//       this.setState({ erased: false });

//     }
  };

//   erase = e => {
//     this.setState({
//       erased: true
//     });
//   };

  render() {
    // console.log(this.state.erased);
    return (
      <div className='canvas'>
      <h1>Draw!</h1>
        <Sketch setup={this.setup} draw={this.draw} />
        {/* <button onClick={e => this.erase(e)}>Erase</button> */}
      </div>
    );
  }
}
