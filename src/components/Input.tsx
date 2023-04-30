import React from 'react';
import './Input.css'

interface Props {
    type: string,
    id: string,
    label: string
}

function Input(props: Props) {
    return (
        <div className="input-container ic1">
            <input id={props.id} className="input" type={props.type} placeholder=" "/>
            <label htmlFor={props.id} className="placeholder">{props.label}</label>
        </div>
    )
}

export default Input;