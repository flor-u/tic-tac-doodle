import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'


export default class GuessInput extends Component {
    constructor(){
        super()
        this.state={
            text:""
        }
    }

    handleText=(e)=>{
        this.setState({...this.state, text: e.target.value})
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.info(this.state.text)
        this.setState({...this.state, text: ""})
    }

    // Este componente renderiza el input para escribir mensajes dentro del chat
    render() {
        return (
            <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                onChange={e => {
                  this.handleText(e);
                }}
                type="text"
                placeholder="Your message"
                value={this.state.text}
              />
            </Form.Group>
    
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                this.handleSubmit(e);
              }}
            >
              Send
            </Button>
          </Form>
        )
    }
}