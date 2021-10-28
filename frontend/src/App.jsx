import './App.css';
import { useState } from 'react';

export default function App() {

     const [station, setStation] = useState("");
     const [city, setCity] = useState("")

    function radioChange(city) {
    const url = `http://localhost:9125/city/${city}`;

    fetch(url)
      .then(response => response.json())
      .then(station => {setStation(station.station)})
      .catch(error => {
        alert("Oh no! An error happened! Please try again. If the problem persists, contact support at 555-123-456 :)");
        console.error(error);
      })
  }

    return (
        <div className="App">
            <h1>Select a city to listen to a local radio station</h1>
                <div className="select">
                <select onChange={(e) => { setCity(e.target.value); radioChange(city)}} name="format" id="format">
                    <option selected disabled>Choose a city</option>
                    <option value="wellington">Wellington</option>
                    <option value="fortDeFrance">Fort-de France</option>
                    <option value="donosti">Donostia-San Sebastián</option>
                </select>
                </div>
            {/* <button onClick={handleClick}>Station</button> */}
            <audio src={station} controls autoPlay/>
        </div>
    )
}