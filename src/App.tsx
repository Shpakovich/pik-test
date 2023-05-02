import React from 'react';
import './App.css';
import FormRoomBooking from './components/FormRoomBooking';
import FormSubmissionInfo from "./components/FormSubmissionInfo";

const DAY_BACKGROUND = 'https://0.pik.ru.cdn.pik-service.ru/undefined/2021/08/03/dji_0093.rev00_wj16guVhKoupGK8K.jpg';
const NIGHT_BACKGROUND = 'https://0.pik.ru.cdn.pik-service.ru/undefined/2020/07/21/dsc06845_481909dfb262bfdcb554e38bd110c38f_eZGKKhSFQDqht6yz.jpg';
const hours = new Date().getHours();
const backgroundImage = hours > 17 || hours < 6 ? NIGHT_BACKGROUND : DAY_BACKGROUND;
function App() {
    const isFormSubmitted = false;
    let formContent;
    if (!isFormSubmitted) formContent = <FormRoomBooking />
    else formContent = <FormSubmissionInfo status="error" />
    return (
    <div className="App" style={{background: `url(${backgroundImage})`, backgroundSize: "cover"}}>
        <div className="FormRoomBooking">
            {formContent}
        </div>
    </div>
  );
}

export default App;
