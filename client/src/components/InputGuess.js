import React, { Component } from "react";


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
      <div className='flex'>
      <form onSubmit={e => {
            this.handlerSubmit(e);
          }} className='flex'>
        <input className
        ='guess-input'
          onChange={e => {
            this.handlerText(e);
          }}
          type="text"
          placeholder='Your guess'
          value={this.state.text}
        />

        <button className
        ='send yel'
          type='submit'
          >
          Send
        </button>
        </form>
      </div>
    );
  }
}
