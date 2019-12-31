import React from 'react'
import './button.css'

function Button(props) {
    return (
        <button className='butn inside'>{props.label}</button>
    )
}

export default Button
