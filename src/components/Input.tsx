import React, {Component} from 'react';
import './Input.css'

interface Props {
    value: any;
    type: string,
    id: string,
    label: string
}

class Input extends Component<Props> {
    render() {
        return (
            <div className="input-container ic1">
                <input id={this.props.id} className="input" type={this.props.type} placeholder=" "/>
                <label htmlFor={this.props.id} className="placeholder">{this.props.label}</label>
            </div>
        )
    }
}

export default Input;