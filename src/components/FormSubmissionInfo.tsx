import {Component} from "react";
import './FormSubmissionInfo.css'
import done from '../assets/done.svg';
import error from '../assets/error.svg';

interface Props {
    status: 'error' | 'done'
}
export default class FormSubmissionInfo extends Component<Props> {
    render() {
        const ERROR_TEXT = 'Ошибка. Попробуйте позже';
        const DONE_TEXT = 'Ваша заявка отправленае';
        return (
            <>
                <img className="icon" src={this.props.status === 'error' ? error : done} alt={this.props.status}/>
                <p className="text-info">{this.props.status === 'error' ? ERROR_TEXT : DONE_TEXT}</p>
            </>
        )
    }
}