import React, {Component} from 'react';
import './FromRoomBooking.css';
import Input from './Input'
import getFormTitle from "../helpers/getCurrentTimesOfDay";
import {Form, FormStore} from "../store/form";
import wordDeclension from "../helpers/wordDeclension";
import {isValidPhoneNumber} from "libphonenumber-js";

const initialState = {
    firstName: '',
    lastName: '',
    phone: '',
    mail: '',
    flatsCount: 0,
};

export function updateForm (state: Form, action: HTMLInputElement) {
    let newStore = {
        [action.id]: action.value
    };
    return {...state, ...newStore}
}

// @ts-ignore
const formStore = new FormStore(updateForm, initialState);

export default class FromRoomBooking extends Component<{}, {isSubmitBtnActive: boolean}> {
    constructor(props: any) {
        super(props);
        this.changeForm = this.changeForm.bind(this);
        this.state = {
            isSubmitBtnActive: false,
        };
    }

    componentDidMount() {
        formStore.subscribe(()=> {
            console.error('state', formStore.state)
            this.setState({isSubmitBtnActive: Object.values(formStore.state).every(value => !!value)})
        })
    }

    changeForm(e: any) {
        formStore.update(e.target)
    }

    getButtonText () {
        const wordList = ['помещение', 'помещения', 'помещений']
        const room = wordDeclension(formStore.state.roomCounter, wordList)
        return formStore.state.roomCounter
            ? `Забронировать ${formStore.state.roomCounter} ${room}`
            : 'Забронировать помещение';
    }

    submitForm (event: any) {
        event.preventDefault(); // не перезагружать страницу после отправки формы
        const {firstName, lastName, mail, phone, flatsCount} = formStore.state;
        const time = Date.now();
        const isValidPhone = isValidPhoneNumber(phone, 'RU')
        if (!isValidPhone) {
            return console.error('phone is not valid')
        } else {
            const data = {
                user: { firstName, lastName, mail, phone },
                order: { flatsCount, time }
            }
            console.log(data)
        }
    }

    render() {
        // @ts-ignore
        return (
            <>
                <h1>{getFormTitle()}</h1>
                <p>Для бронирования помещений<br/>заполните форму</p>

                <form onSubmit={this.submitForm} onChange={e=> this.changeForm(e)}>
                    <div className="NamesFields">
                        <Input value={formStore.state.name} id="firstName" type="text" label="Ваше имя" />
                        <Input value={formStore.state.surname} id="lastName" type="text" label="Фамилия" />
                    </div>
                    <Input value={formStore.state.phone} id="phone" type="tel" label="Телефон" />
                    <Input value={formStore.state.email} id="mail" type="email" label="E-mail" />
                    <Input value={formStore.state.roomCounter} id="flatsCount" type="number" label="Количество помещений" />
                    <input className={`button`} type="submit" value={this.getButtonText()} disabled={!this.state.isSubmitBtnActive}/>
                </form>
                <p className="disclaimer">Это дисклеймер, который есть во всех формах</p>
            </>
        )
    }
};