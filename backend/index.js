import express from "express";
import connect from "./libs/config.js";
import config from "./libs/config.js";
import axios from "axios";

// Setup / Configure Express
const app = express();
config(app);
connect(app);

const optionsWellington = {
  method: "GET",
  url: "https://50k-radio-stations.p.rapidapi.com/get/channels",
  params: { city_id: "360", country_id: "27", page: "1" },
  headers: {
    "x-rapidapi-host": "50k-radio-stations.p.rapidapi.com",
    "x-rapidapi-key": 'fee5a13ae9mshb1357a73307c3b0p10276cjsn7bfb52f8c0c0',
  },
};

const optionsMadrid = {
  method: "GET",
  url: "https://50k-radio-stations.p.rapidapi.com/get/channels",
  params: { city_id: "447", country_id: "33", page: "1" },
  headers: {
    "x-rapidapi-host": "50k-radio-stations.p.rapidapi.com",
    "x-rapidapi-key": 'fee5a13ae9mshb1357a73307c3b0p10276cjsn7bfb52f8c0c0',
  },
};

const optionsFdF = {
  method: "GET",
  url: "https://50k-radio-stations.p.rapidapi.com/get/channels",
  params: { city_id: "3885", country_id: "61", page: "1" },
  headers: {
    "x-rapidapi-host": "50k-radio-stations.p.rapidapi.com",
    "x-rapidapi-key": 'fee5a13ae9mshb1357a73307c3b0p10276cjsn7bfb52f8c0c0',
  },
};


app.get("/city/:cityName", (req, res) => {
  const cityName = req.params.cityName
  let options
  switch(cityName) {
  case "wellington":
    options = optionsWellington
    break;
  case "madrid":
    options = optionsMadrid
    break;
  case "fortDeFrance":
    options = optionsFdF
    break;
  default:
}

  axios
    .request(options)
    .then(function (response) {
      res.json({ station: response.data.data[1].streams_url[0].url });
    })
    .catch(function (error) {
      console.error(error);
    });
});

const PORT = process.env.PORT || 9125;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
