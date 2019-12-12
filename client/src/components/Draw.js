import React, { Component } from "react";
import Canvas from "./Canvas";
import Words from "../words.json";
import CountDown from "./CountDown";
import Clock from "./Clock";

export default class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: { ...this.props.appState },
      words: [...Words],
      timeFinish: false
    };
    // console.log(this.state.words);
  }
  wordList = () => {
    let category = [...this.state.words[0][this.state.game.category]]; //array containing 100 words of selected category
    let word = category[Math.floor(Math.random()*category.length)];
    // const shuffled = category.sort(() => 0.5 - Math.random());//shuffles the array's elemnts
    // let selected = shuffled.slice(0, 10);// Get sub-array of first 10 elements after shuffled
    console.log(word)
  };

  handleChange = e => {
    console.log(e);
    // const {name, value} = e;
    this.setState(e);
  };

  render() {
    this.wordList();
    return (
      <React.Fragment>
      {/* <Clock></Clock> */}
        <CountDown></CountDown>
        <div className='words'></div>
        <Canvas></Canvas>
      </React.Fragment>
    );
  }
}
