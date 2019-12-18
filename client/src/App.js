import React from "react";
import { Switch, Route } from "react-router-dom";

import AuthService from "./services/AuthService";

import "./App.css";
import { Navbar, Nav } from "react-bootstrap";

import Home from "./components/Home";

import Signup from "./components/Signup";
import Login from "./components/Login";

import Profile from "./components/Profile";

import Draw from "./components/Draw";
import ChooseGame from "./components/ChooseGame";
import WordToDraw from "./components/WordToDraw";
import tryCanvasSend from "./components/tryCanvasSend";
import tryCanvasReceive from "./components/TryCanvasReceive";

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
    this.setState(e);
  };


  render() {
    this.fetchUser();
    const { user } = this.state;

    return (
      <div className='App'>
        {user && (
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' render={match => <Login {...match} setUser={this.setUser} />} />
            <Route exact path='/signup' render={match => <Signup {...match} setUser={this.setUser} />} />
            <Route exact path='/choose-game' render={match => <ChooseGame {...match} setCategory={e => this.handleChange(e)} appState={this.state} />} />
            <Route exact path='/word-to-draw' render={match => <WordToDraw {...match} setCategory={e => this.handleChange(e)} appState={this.state} />} />
            <Route exact path='/profile' render={match => <Profile {...match} appState={this.state} />} />
            <Route exact path='/draw' render={match => <Draw {...match} appState={this.state}/>} />
            <Route exact path='/try' component={tryCanvasSend} />
            <Route exact path='/guess' component={tryCanvasReceive} />
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
