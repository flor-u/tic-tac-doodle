import React, { Component } from 'react'
import styled from 'styled-components'

const Card = styled.img`
width: 16rem;
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
            <div className='doodleCard'>
                <Card src={this.props.doodle} alt="" />
            </div>
        )
    }
}
