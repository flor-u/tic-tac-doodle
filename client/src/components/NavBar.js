import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import styled from "styled-components";

const Header = styled.header`
background-color: #C2EFF5;
  border-bottom: .6rem ridge #C2EFF5;
  box-shadow: 0px 1px 1px 0px rgba(16,24,50,.2);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-transform: uppercase; 
  ${'' /* position: fixed; */}
  padding: 0.4rem 0;
  height: 2.4rem;
  ${'' /* transition: all 0.3s; */}
  width: 100vw;
`;

const Ul = styled.ul`
  text-decoration: none;
  ${'' /* margin: 0 0.6rem 0 0; */}
  display:flex;
  
`;

const LiA = styled.li`
  padding: .4rem 0.5rem;
  ${'' /* font-family: "Nanum Pen Script", cursive; */}
  font-weight: 500;
  display: block;
  color: inherit;
  margin: 1rem;
  text-align: right;
  font-size: .9rem;
`;

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    console.log(this.props)
  
  }

  
  logoutUser = () => {
    this.authService
      .logout()
      .then(x => this.props.setUser(false))
      .then(x => this.props.setCategory({ category: "", gameType: "" }))
      
      .catch(err => console.log(err));
  };

  render() {
      const path= this.props.props.match.path

    return (
      path === '/profile' ?
      <Header>
        <Ul>
          <LiA>
            <Link to='' onClick={() => this.props.props.history.goBack()}>
              Back
            </Link>
          </LiA>
          <LiA>
            <Link to='/select'>
              Play
            </Link>
          </LiA>
          <LiA>
            <Link to='/' onClick={this.logoutUser}>
              Logout
            </Link>
          </LiA>
        </Ul>
      </Header>
      
      :

      <Header>
        <Ul>
          <LiA>
            <Link to='' onClick={() => this.props.props.history.goBack()}>
              Back
            </Link>
          </LiA>
          <LiA>
            <Link to='/profile'>
              Profile
            </Link>
          </LiA>
          <LiA>
            <Link to='/' onClick={this.logoutUser}>
              Logout
            </Link>
          </LiA>
        </Ul>
      </Header>
    );
  }
}

