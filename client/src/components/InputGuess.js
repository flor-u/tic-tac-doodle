import React, { Component } from "react";
import styled from "styled-components";

const Button = styled.button`
  border: 3px rgb(16, 24, 50) solid;
  outline: none;
  cursor: pointer;
  min-width: 2rem;
  padding: 0.4rem 0.7rem;
  box-shadow: 2rem 2rem transparentize(rgb(16, 24, 50), 1);
  transform-origin: rigth top;
  font-family: 'Nanum Pen Script', cursive;
  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: 0.05rem;
  ${'' /* box-shadow: 0 5px rgb(16, 24, 50); */}
  &:active{
    transform: translateY(4px);
    box-shadow: 0 1px rgb(16, 24, 50);
  }
`;

export default class InputGuess extends Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
  }

  handlerText = e => {
    this.setState({ ...this.state, text: e.target.value });
  };

  handlerSubmit = e => {
    e.preventDefault();
    this.props.info(this.state.text);
    this.setState({ ...this.state, text: "" });
  };

  render() {
    return (
      <div className=''>
      <form onSubmit={e => {
            this.handlerSubmit(e);
          }} className='textForm'>
        <input className
        ='guess-input'
          onChange={e => {
            this.handlerText(e);
          }}
          type="text"
          placeholder="What's the word?..."
          value={this.state.text}
        />
{/* 
        <Button className
        ='send yel'
          type='submit'
          >
          Send
        </Button> */}
        </form>
      </div>
    );
  }
}
