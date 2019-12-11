import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Access from "./components/Access";
import Select from "./components/Select";
import Choose from "./components/Choose";
import Canvas from "./components/Canvas";
import AuthService from "./services/AuthService";
import Login from "./components/Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    user: null
  };

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

  componentDidMount() {
    this.fetchUser();
  }
  render() {
    this.fetchUser();
    const { user } = this.state;

    return (
      <div className='App'>
        {/* <header className="App-header"> */}
        {user && (
          <Switch>
            <Route exact path='/' render={match => <Home {...match} setUser={this.setUser} />} />
            />
            <Route exact path='/login' render={match => <Login {...match} setUser={this.setUser} />} />
            <Route exact path='/signup' render={match => <Access {...match} setUser={this.setUser} />} />
            <Route exact path='/select' render={match => <Select {...match} setUser={this.setUser} />} />
            <Route exact path='/choose-game' render={match => <Choose {...match} setUser={this.setUser} />} />
            <Route
              exact
              path='/draw'
              render={match => 
              <Canvas {...match} setUser={this.setUser} />} />
          </Switch>
        )}
        {!user && (
          <Switch>
            <Route exact path='/' render={match => <Home {...match} setUser={this.setUser} />} />
            <Route exact path='/login' render={match => <Access {...match} setUser={this.setUser} />} />
            <Route exact path='/signup' render={match => <Access {...match} setUser={this.setUser} />} />
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
