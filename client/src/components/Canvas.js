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
  fileUpload=(draw)=> {
    let data = new FormData();
    draw.toBlob((blob) =>{
        data.append('data', blob);

        this.authService.upload(data, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      })
            .then(res => {
                console.log(res)
            });
    });
}

  setup = p5 => {
    this.canvas = p5.createCanvas(20, 20).parent("canvas");
    p5.background(255);
    p5.strokeWeight(6);
    // p5.stroke(234);
    p5.frameRate(60);
  };


  draw = p5 => {
    let line = [];
    if (p5.mouseIsPressed === true) {
      line.push(p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY));
      //  console.log(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY)
      // console.log(this.canvas.width, this.canvas.height)

      // this.canvas.elt.toBlob(function(blob) {
      //   var myFile = this.blobToFile(blob, "my-image.png");
      //   console.log(myFile)
      // })
      //   let w = this.canvas.width;
      // let h = this.canvas.height;
      // this.socket.emit('drawing', {
      //   x0: p5.pmouseX / w,
      //   y0: p5.pmouseY / h,
      //   x1: p5.mouseX / w,
      //   y1: p5.mouseY / h,
      // });
    }
    // this.canvas.elt.toBlob(function(blob) {
    //   // console.log(blob)
    // });

    //  console.log(line);
    //  console.log(line.length)

    if (this.state.erased) {
      // let file = this.canvas.elt.toDataURL("image/png").split(",")[1];
      // let image = new File([file], "image.png", { type: "image/png" });
      
      
      // console.log(image);
      // this.authService.upload(image);
      this.fileUpload(this.canvas.elt)

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
    // console.log(this.state.erased);
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
