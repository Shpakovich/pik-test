import React, {Component} from 'react';
import './Input.css'

interface Props {
    type: string,
    id: string,
    label: string,
    isError?: string
}

class Input extends Component<Props> {
    getErrorText() {
        return (
            <p className="error-text">{this.props.isError}</p>
        );
    }
    render() {
        return (
            <div className={`input-container ${!!this.props.isError && 'error-container'}`}>
                <input id={this.props.id} className={`input ${!!this.props.isError && 'error'}`} type={this.props.type} placeholder=" "/>
                <label htmlFor={this.props.id} className="placeholder">{this.props.label}</label>
                {!!this.props.isError && this.getErrorText()}
            </div>
        )
    }
}

export default Input;