import React, { Component } from "react";
import AuthService from "../services/AuthService";
import Sketch from "./Sketch";
import styled from 'styled-components'


const ButtonWrapper = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
padding: 1.2rem;
`;

const Button= styled.button`
border: 3px rgb(16, 24, 50) solid;
outline: none;
  cursor: pointer;
  min-width: 2rem;
  padding: .4rem 1rem;
  margin: auto 2rem;
  box-shadow: 2rem 2rem transparentize(rgb(16, 24, 50), 1);
  transform-origin: rigth top;
  font-family: 'Nanum Pen Script', cursive;
  font-size: 1.6rem;
  &:active{
    transform: translateY(4px);
    box-shadow: 0 1px rgb(16, 24, 50);}
`;


export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.state = {
      erased: false,
    };
    console.log(this.props)
  }

  setup = p5 => {
    this.canvas = p5.createCanvas(600, 450).parent("canvas");
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
    // console.log(image)
    this.authService.upload({ image });
  };

  erase = e => {
    this.setState({
      erased: true
    });
  };

  
componentWillUnmount(){
  let image = this.canvas.elt.toDataURL("image/png");
    this.props.image(image)
  
}

  render() {
    console.log("rendered");
    return (
      <React.Fragment>
      <div>
        <ButtonWrapper>
          <Button className='bg' onClick={this.save}>save</Button>
          <Button className='bg yel' onClick={this.erase}>x</Button>
          </ButtonWrapper>
          <div id='canvas'>
            <Sketch setup={this.setup} draw={this.draw} clear={this.clear}/>
          </div>
          </div>
        
      </React.Fragment>
    );
  }
}
