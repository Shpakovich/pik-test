import React from 'react';
import './App.css';
import RoomBooking from "./view/RoomBooking";
import {getAppBg} from "./helpers/getAppBg";

function App() {
    return (
    <div className="App" style={{background: `url(${getAppBg()})`, backgroundSize: "cover"}}>
        <RoomBooking />
    </div>
  );
}

export default App;
