import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import styled from "styled-components";

const Header = styled.header`
  border-bottom: 0.2rem solid rgb(16, 24, 50);
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  ${"" /* text-transform: uppercase; */}
  ${"" /* position: fixed; */}
    width: 100%;
  padding: 0.8rem 0;

  z-index: 9999;
  transition: all 0.3s;
`;

const Ul = styled.ul`
  text-decoration: none;
  margin: 0 0.6rem 0 0;
`;

const LiA = styled.a`
  padding: 1rem 0.5rem;
  font-family: "Nanum Pen Script", cursive;
  font-weight: 500;
  display: inline-block;
  color: inherit;
  margin: 0 1.5rem;
  text-align: right;
  font-size: 1.6rem;
`;

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  logoutUser = () => {
    this.authService
      .logout()
      .then(x => this.props.setUser(false))
      .then(x => this.props.setCategory({ category: "", gameType: "" }))
      .catch(err => console.log(err));
  };

  render() {
    // const saludo = this.props.loggedInUser ? this.props.loggedInUser.username : 'invitado'

    return (
      // this.props.loggedInUser ?
      <Header>
        <Ul>
          <LiA>
            <Link to='/'>
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

export default NavBar;
