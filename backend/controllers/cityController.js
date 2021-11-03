import express from 'express';
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const { X_RAPIDAPI_KEY } = process.env;

const optionsWellington = {
  method: "GET",
  url: "https://50k-radio-stations.p.rapidapi.com/get/channels",
  params: {
    city_id: "360",
    country_id: "27",
    page: "1",
  },
  headers: {
    "x-rapidapi-host": "50k-radio-stations.p.rapidapi.com",
    "x-rapidapi-key": `${ X_RAPIDAPI_KEY }`,
  },
};

const optionsBilbao = {
  method: "GET",
  url: "https://50k-radio-stations.p.rapidapi.com/get/channels",
  params: {
    city_id: "447",
    country_id: "33",
    page: "1",
  },
  headers: {
    "x-rapidapi-host": "50k-radio-stations.p.rapidapi.com",
    "x-rapidapi-key": `${ X_RAPIDAPI_KEY }`,
  },
};

const optionsFdF = {
  method: "GET",
  url: "https://50k-radio-stations.p.rapidapi.com/get/channels",
  params: {
    city_id: "3885",
    country_id: "61",
    page: "1",
  },
  headers: {
    "x-rapidapi-host": "50k-radio-stations.p.rapidapi.com",
    "x-rapidapi-key": `${ X_RAPIDAPI_KEY }`,
  },
};

router.use("/:cityName", (req, res) => {
  const cityName = req.params.cityName;
  let options;
  switch (cityName) {
    case "wellington":
      options = optionsWellington;
      break;
    case "bilbao":
      options = optionsBilbao;
      break;
    case "fortDeFrance":
      options = optionsFdF;
      break;
    default:
  }

  axios
    .request(options)
    .then(function (response) {
      res.json(
        {
        station: response.data.data[2].streams_url[0].url
      });
    })
    // .then(function (response) {
    //     cityName == "bilbao" ?
    //   res.json(
    //     {
    //     station: response.data.data[4].streams_url[0].url
    //   })
    //   :
    //   res.json(
    //     {
    //     station: response.data.data[2].streams_url[0].url
    //   })
    // })
    .catch(function (error) {
      console.error(error);
    });
});

export default router;
