import "./Radio.css";
import { useState, useEffect } from "react";
import dotenv from 'dotenv';


export default function Radio() {

  const [station, setStation] = useState("");
  const [city, setCity] = useState("");
  dotenv.config();
  const PORT = process.env.PORT || 9127;
  const url = `http://localhost:${PORT}/city/${city}`;

  
  useEffect(() => {
    city.length > 1 ? 
      fetch(url)
      .then((response) => response.json())
      .then((station) => {
        setStation(station.station);
      })
      .catch((error) => {
        alert(
          "Oh no! An error happened! Please try again. If the problem persists, contact support at 555-123-456 :)"
        );
        console.error(error);
      }) : null
  }, [city]); 

	return (
		<div className="Radio">
			<div className="select">
				<select
					onChange={(e) => {
						setCity(e.target.value);
						// radioChange(e.target.value);
					}}
					value={city}
					name="format"
					id="format"
				>
					<option value="">Choose a city</option>
					<option value="wellington">Wellington</option>
					<option value="fortDeFrance">Fort-de France</option>
					<option value="bilbao">Bilbao</option>
				</select>
			</div>
			<audio src={station} controls autoPlay />
		</div>
	);
}
