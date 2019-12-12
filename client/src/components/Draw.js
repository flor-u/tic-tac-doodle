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
      timeFinish: false,
      word:''
    };
    console.log()
  }

  wordList = () => {
    let category = [...this.state.words[0][this.props.appState.category]]; //array containing 100 words of selected category
    let word = category[Math.floor(Math.random()*category.length)];
//     // const shuffled = category.sort(() => 0.5 - Math.random());//shuffles the array's elemnts
//     // let selected = shuffled.slice(0, 10);// Get sub-array of first 10 elements after shuffled
    this.setState({'word': word});
  };

  handleChange = data => {
    // console.log(data);
    this.setNewRound();
    this.setState(data);

  };

  componentDidMount(){
      this.wordList()
      this.setNewRound()
  }

  setNewRound(){
    this.wordList()

  }

  render() {
    return (
      <React.Fragment>
      {/* <Clock finishTime={data =>this.handleChange(data)}></Clock> */}
        <CountDown finishTime={data =>this.handleChange(data)}></CountDown>
        <h4 className='words'>{this.state.word}</h4>
        <Canvas></Canvas>
      </React.Fragment>
    );
  }
}
