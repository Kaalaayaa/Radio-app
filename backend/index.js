import express from 'express';
import connect from "./libs/config.js";
import config from './libs/config.js';
import axios from "axios"


// Setup / Configure Express
const app = express();
config(app)
connect(app)

var options = {
  method: 'GET',
  url: 'https://50k-radio-stations.p.rapidapi.com/get/channels',
  params: {keyword: 'a', country_id: '50', page: '1'},
  headers: {
    'x-rapidapi-host': '50k-radio-stations.p.rapidapi.com',
    'x-rapidapi-key': '1d26f359d5mshd8151fbb9814149p1e79f5jsned2a629458dd'
  }
};

app.get("/api", (req, res) => {
axios.request(options).then(function (response) {
	res.json({ station : response.data.data[0].streams_url[0].url});
}).catch(function (error) {
	console.error(error);
});

})


const PORT = process.env.PORT || 9124
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))