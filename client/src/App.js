import React from "react";
import { Switch, Route } from "react-router-dom";

import AuthService from "./services/AuthService";

import "./App.css";
import { Navbar, Nav } from "react-bootstrap";

import Home from "./components/Home";

import Signup from "./components/Signup";
import Login from "./components/Login";

import Profile from "./components/Profile";
import Navigation from "./components/NavBar";
import Draw from "./components/Draw";
import ChooseGame from "./components/ChooseGame";
import WordToDraw from "./components/WordToDraw";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    user: null,
    category: "", //from what list the user will be drawing
    gameType: "" //playing solo or in group
  };

  //user methods//
  setUser = user => {
    console.log(this.state);
    this.setState({ ...this.state, user });
  };

  fetchUser = () => {
    if (this.state.user === null) {
      this.authService
        .loggedInUser()
        .then(
          user => {
            this.setUser(user);
          },
          error => {
            this.setUser(false);
          }
        )
        .catch(() => {
          this.setUser(false);
        });
    }
  };


  handleChange = e => {
    console.log(e);
    // const {name, value} = e;
    this.setState(e);
  };

  // componentDidMount() {
  //   this.wordList();
  // }

  render() {
    this.fetchUser();
    const { user } = this.state;

    return (
      <div className='App'>
        {/* <header className="App-header"> */}
        {/* <Navigation loggedInUser={this.state} setUser={this.setUser} setCategory={e=>this.handleChange(e)}/> */}
        {user && (
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' render={match => <Login {...match} setUser={this.setUser} />} />
            <Route exact path='/signup' render={match => <Signup {...match} setUser={this.setUser} />} />
            <Route exact path='/choose-game' render={match => <ChooseGame {...match} setCategory={e => this.handleChange(e)} appState={this.state} />} />
            <Route exact path='/word-to-draw' render={match => <WordToDraw {...match} setCategory={e => this.handleChange(e)} appState={this.state} />} />
            <Route exact path='/profile' render={match => <Profile {...match} appState={this.state} />} />
            <Route exact path='/draw' render={match => <Draw {...match} appState={this.state}/>} />
          </Switch>
        )}
        {!user && (
          <Switch>
            <Route exact path='/' render={match => <Home {...match} setUser={this.setUser} />} />
            <Route exact path='/login' render={match => <Login {...match} setUser={this.setUser} />} />
            <Route exact path='/signup' render={match => <Signup {...match} setUser={this.setUser} />} />
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
