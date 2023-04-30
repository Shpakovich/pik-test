import React, {Component} from 'react';
import './FromRoomBooking.css';
import Input from './Input'
import getFormTitle from "../helpers/getCurrentTimesOfDay";
import {FormStore, updateForm} from "../store/form";

const initialState = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    roomCounter: 0,
};

const formStore = new FormStore(updateForm, initialState);

formStore.subscribe(()=> console.error('state change', formStore.state))

export default class FromRoomBooking extends Component {
    constructor(props: any) {
        super(props);
        // @ts-ignore
        this.getFormTitle = getFormTitle.bind(this);
    }

    componentDidMount() {
        formStore.subscribe(()=> this.forceUpdate());
    }

    render() {
        // @ts-ignore
        return (
            <div className="FormRoomBooking">
                <h1>{ // @ts-ignore
                    this.getFormTitle()
                    }</h1>
                <p>Для бронирования помещений<br/>заполните форму</p>

                <form action="URL" onChange={e=> {
                    // @ts-ignore
                    formStore.update({[`${e.target.id}`]: e.target.value})
                }}>
                    <div className="NamesFields">
                        <Input value={formStore.state.name} id="name" type="text" label="Ваше имя" />
                        <Input value={formStore.state.surname} id="surname" type="text" label="Фамилия" />
                    </div>
                    <Input value={formStore.state.phone} id="phone" type="tel" label="Телефон" />
                    <Input value={formStore.state.email} id="email" type="email" label="E-mail" />
                    <Input value={formStore.state.roomCount} id="roomCount" type="text" label="Количество помещений" />
                    <input className="button" type="submit" value="Забронировать 8 квартир"/>
                </form>
                <p className="disclaimer">Это дисклеймер, который есть во всех формах</p>
            </div>
        )
    }
};