import React from 'react';
import './FromRoomBooking.css';
import Input from './Input'

function FromRoomBooking() {
    return (
        <div className="FormRoomBooking">
            <h1>Добрый вечер</h1>
            <p>Для бронирования помещений<br/>заполните форму</p>

            <form action="URL">
                <div className="NamesFields">
                    <Input id="name" type="text" label="Ваше имя" />
                    <Input id="surname" type="text" label="Фамилия" />
                </div>
                <Input id="phone" type="tel" label="Телефон" />
                <Input id="email" type="email" label="E-mail" />
                <Input id="roomCount" type="text" label="Количество помещений" />
                <input className="button" type="submit" value="Забронировать 8 квартир"/>
            </form>
            <p className="disclaimer">Это дисклеймер, который есть во всех формах</p>
        </div>
    );
}

export default FromRoomBooking;