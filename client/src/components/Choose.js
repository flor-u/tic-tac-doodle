import React, { Component } from 'react'
import { Link } from "react-router-dom";
import AuthService from '../services/AuthService'
import ChooseCard from './chooseCard';

export default class Choose extends Component {
    constructor(props) {
    super(props);
    this.authService = new AuthService();
    
  }

  state = {
    username: '',
    password: '',
    category:''

  }

  handleChange = (e) => {
    //   e.preventDefault()
      console.log(e.target.value, e.target.name)
    const { name, value } = e.target;
    this.setState({...this.state, [name]:value})
    
  }
//   sendChangeToApp= (e) => {
//       console.log(e)
//     const { name, value } = e;
//     return this.props.changeApp(name,value)
// }

    render() {
        // console.log(this.props)
        return (
            <div>
            {/* <button value="easy" name="category" 
            onClick={this.handleChange}
            >aqui</button> */}
            <button>
            <Link to='/select' name='category' value="a"
            onClick={this.handleChange}>
            aqui
          </Link>
          </button>
          <button>
          <Link to='/select'>
            Choose game
          </Link>
        </button>
                <Link to='/' onClick={this.logoutUser}>
          Logout
        </Link>
            </div>
        )
    }
}
