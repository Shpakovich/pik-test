import React, {Component} from 'react';
import './Input.css'

interface Props {
    value: any;
    type: string,
    id: string,
    label: string
}

class Input extends Component<Props> {
    constructor(props: Props) {
        console.error('event', props.value)
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event: any) {
        console.error('event', event)
        this.setState({value: event.target.value});
    }
    render() {
        console.error('props', this.props.value)
        return (
            <div className="input-container ic1">
                <input id={this.props.id} className="input" type={this.props.type} placeholder=" " onChange={this.handleChange}/>
                <label htmlFor={this.props.id} className="placeholder">{this.props.label}</label>
            </div>
        )
    }
}

export default Input;