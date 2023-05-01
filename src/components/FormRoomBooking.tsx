import React, {Component} from 'react';
import './FromRoomBooking.css';
import Input from './Input'
import getFormTitle from "../helpers/getCurrentTimesOfDay";
import {Form, FormStore} from "../store/form";
import wordDeclension from "../helpers/wordDeclension";

const initialState = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    roomCounter: 0,
};

export function updateForm (state: Form, action: HTMLInputElement) {
    console.error('state', action)
    let newStore = {
        [action.id]: action.value
    };
    return {...state, ...newStore}
}

// @ts-ignore
const formStore = new FormStore(updateForm, initialState);

export default class FromRoomBooking extends Component {
    constructor(props: any) {
        super(props);
        this.changeForm = this.changeForm.bind(this);
    }

    componentDidMount() {
        formStore.subscribe(()=> this.forceUpdate());
        formStore.subscribe(()=> console.error('state change', formStore.state))
    }

    changeForm(e: any) {
        console.error('changeForm', e)
        formStore.update(e.target)
    }

    getButtonText () {
        const wordList = ['помещение', 'помещения', 'помещений']
        const room = wordDeclension(formStore.state.roomCounter, wordList)
        return formStore.state.roomCounter
            ? `Забронировать ${formStore.state.roomCounter} ${room}`
            : 'Забронировать помещение';
    }

    render() {
        // @ts-ignore
        return (
            <div className="FormRoomBooking">
                <h1>{getFormTitle()}</h1>
                <p>Для бронирования помещений<br/>заполните форму</p>

                <form action="URL" onChange={e=> this.changeForm(e)}>
                    <div className="NamesFields">
                        <Input value={formStore.state.name} id="name" type="text" label="Ваше имя" />
                        <Input value={formStore.state.surname} id="surname" type="text" label="Фамилия" />
                    </div>
                    <Input value={formStore.state.phone} id="phone" type="tel" label="Телефон" />
                    <Input value={formStore.state.email} id="email" type="email" label="E-mail" />
                    <Input value={formStore.state.roomCounter} id="roomCounter" type="number" label="Количество помещений" />
                    <input className="button" type="submit" value={this.getButtonText()}/>
                </form>
                <p className="disclaimer">Это дисклеймер, который есть во всех формах</p>
            </div>
        )
    }
};