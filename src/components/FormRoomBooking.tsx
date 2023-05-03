import React, {Component} from 'react';
import './FromRoomBooking.css';
import Input from './Input'
import getFormTitle from "../helpers/getCurrentTimesOfDay";
import {Form, FormStore} from "../store/form";
import wordDeclension from "../helpers/wordDeclension";
import {isValidPhoneNumber} from "libphonenumber-js";
import {FormStatus} from "../view/RoomBooking";
import IMask from 'imask';
import {ValidateEmail} from "../helpers/validateEmail";

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

const formStore = new FormStore(updateForm, initialState);

interface FromRoomBookingProps {
    onSubmit: (status: FormStatus)=> void
}

interface FromRoomBookingState {
    isSubmitBtnActive: boolean,
    errorList: any,
    buttonLoading: boolean
}
export default class FromRoomBooking extends Component<FromRoomBookingProps, FromRoomBookingState> {
    constructor(props: any) {
        super(props);
        this.changeForm = this.changeForm.bind(this);
        this.state = {
            isSubmitBtnActive: false,
            errorList: {},
            buttonLoading: false
        };
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        formStore.subscribe(()=> {
            //this.setState({isSubmitBtnActive: Object.values(formStore.state).every(value => !!value)})
        });
        IMask(
            // @ts-ignore
            document.getElementById('phone'), {
                mask: '+{7}(000) 000-00-00'
            });
    }

    changeForm(e: any) {
        formStore.update(e.target);
        this.setState((prevState) => {
            let errorList = { ...prevState.errorList };
            errorList[e.target.id] = '';
            return { errorList };
        })
    }

    getButtonText () {
        const wordList = ['помещение', 'помещения', 'помещений']
        const room = wordDeclension(formStore.state.flatsCount, wordList)
        return formStore.state.flatsCount
            ? `Забронировать ${formStore.state.flatsCount} ${room}`
            : 'Забронировать помещение';
    }

    getButton () {
        return this.state.buttonLoading
            ? <div className='loading-button'><div className="dot-flashing"></div></div>
            : <input className={`button`} type="submit" value={this.getButtonText()}/>
    }

    submitForm (event: any) {
        event.preventDefault(); // не перезагружать страницу после отправки формы
        const {firstName, lastName, mail, phone, flatsCount} = formStore.state;
        const time = Date.now();

        const isValidPhone = isValidPhoneNumber(phone, 'RU');
        const isValidEmail = ValidateEmail(formStore.state.mail);
        let isFormEmpty = false;

        if (!isValidEmail) {
            this.setState((prevState) => {
                let errorList = { ...prevState.errorList };
                errorList.mail = 'Почта введена некорректно';
                return { errorList };
            })
        }
        if (formStore.state.phone && !isValidPhone) {
            this.setState((prevState) => {
                let errorList = { ...prevState.errorList };
                errorList.phone = 'Телефон введён некорректно';
                return { errorList };
            })
        }
        if (formStore.state.flatsCount <= 0 || !Number.isInteger(Number(formStore.state.flatsCount))) {
            this.setState((prevState) => {
                let errorList = { ...prevState.errorList };
                errorList.flatsCount = 'Укажите колличество помещений';
                return { errorList };
            })
        }

        const EMPTY_FIELD_ERROR_TEXT = 'Заполните поле';

        for (const field in formStore.state) {
            if (!formStore.state[field]) {
                isFormEmpty = true;
                this.setState((prevState) => {
                    let errorList = { ...prevState.errorList };
                    errorList[field] = EMPTY_FIELD_ERROR_TEXT;
                    return { errorList };
                })
            }
        }

        if (!isValidEmail || !isValidPhone || isFormEmpty) return;
        const data = {
            user: { firstName, lastName, mail, phone },
            order: { flatsCount, time }
        }
        const url = "https://strapi.pik.ru/front-tests";
        this.setState({buttonLoading: true});
        fetch(url, {
            body: JSON.stringify(data),
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        }).then(()=> {
            console.log(data);
            this.props.onSubmit('done');
        }).catch((error)=> {
            console.error(`Form submit error: ${error}`);
            this.props.onSubmit('error');
        }).finally(()=> this.setState({buttonLoading: false}))
    }

    render() {
        return (
            <>
                <h1>{getFormTitle()}</h1>
                <p>Для бронирования помещений<br/>заполните форму</p>

                <form onSubmit={this.submitForm} onChange={e=> this.changeForm(e)} noValidate>
                    <div className="NamesFields">
                        <Input id="firstName" type="text" label="Ваше имя" isError={this.state.errorList.firstName}/>
                        <Input id="lastName" type="text" label="Фамилия" isError={this.state.errorList.lastName}/>
                    </div>
                    <Input id="phone" type="tel" label="Телефон" isError={this.state.errorList.phone} />
                    <Input id="mail" type="email" label="E-mail" isError={this.state.errorList.mail}/>
                    <Input id="flatsCount" type="number" label="Количество помещений" isError={this.state.errorList.flatsCount}/>
                    {this.getButton()}
                </form>
                <p className="disclaimer">Это дисклеймер, который есть во всех формах</p>
            </>
        )
    }
};