import React from "react";
import { Switch, Route } from "react-router-dom";

import AuthService from "./services/AuthService";

import "./App.css";

import Home from "./components/Home/Home";

import Signup from "./components/Signup/Signup";
import Login from "./components/Login";

import Profile from "./components/Profile/Profile";

import Draw from "./components/SoloDraw/Draw";
import ChooseGame from "./components/ChooseGame";
import WordToDraw from "./components/Word/WordToDraw";

import GameWrapper from "./components/GameWrapper";
import Select from "./components/Select/Select";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    user: null,
    category: "", 
    userList:[]
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

  updateUserList = name => {
    // if (name.trim() !== "") {
      console.log(name)
      this.setState(state => {
      const list = state.userList.concat(name);
      console.log(this.state.userList);
      return { ...this.state, userList: list }
    });
      
    // }
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
            <Route exact path='/select' render={match => <Select {...match} setCategory={e => this.handleChange(e)} appState={this.state} info={this.updateUserList} />} />
            <Route exact path='/choose-game' render={match => <ChooseGame {...match} setCategory={e => this.handleChange(e)} appState={this.state} />} />
            <Route exact path='/word-to-draw' render={match => <WordToDraw {...match} setCategory={e => this.handleChange(e)} category={this.state.category} />} />
            <Route exact path='/profile' render={match => <Profile {...match} appState={this.state} />} />
            <Route exact path='/draw' render={match => <Draw {...match} appState={this.state}/>} />
            <Route exact path='/game' render={match => <GameWrapper {...match} username={this.state.user.username} category={this.state.category} userList={this.state.userList}/>} />
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
