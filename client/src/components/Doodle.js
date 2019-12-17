import React, { Component } from 'react'
import styled from 'styled-components'
// import AuthService from "./services/AuthService"

const Card = styled.img`
width: 16rem;
border: .2rem solid black;
margin: 1rem 0;
`;

export default class Doodle extends Component {
    constructor(props){
        super(props)
        this.state={
            user: this.props.user
            
        }
       
    }

    

    render() {
        return (
            <div>
            
                <Card src={this.props.doodle} alt=""/>
            </div>
        )
    }
}
