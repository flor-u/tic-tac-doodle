
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Words from "../words.json";
import NavBar from './NavBar.js';

export default class WordToDraw extends Component {
    constructor(props) {
        super(props);
        this.state = {
          game: { ...this.props.appState },
          words: [...Words],
          timeFinish: false,
          word:''
        };
        console.log(this.props.appState.category)
      }


    wordList = () => {
        let category = [...this.state.words[0].medium]; //array containing 100 words of selected category
        let word = category[Math.floor(Math.random()*category.length)];
    //     // const shuffled = category.sort(() => 0.5 - Math.random());//shuffles the array's elemnts
    //     // let selected = shuffled.slice(0, 10);// Get sub-array of first 10 elements after shuffled
        this.setState({'word': word});
      };

      componentDidMount(){
        this.wordList()
    }


    render() {
        return (
            <div className='cel' >
            <NavBar></NavBar>
            <div className='flex center'>
            <h3>Draw</h3>
                <h4 className='words'>{this.state.word}</h4>
                <h3>in less than 20 seconds</h3>
                <Link className="btn cta bg yel" to='/draw' game={this.state}>Go</Link>
            </div>
            </div>
        )
    }
}



