import express from "express";
import connect from "./libs/database.js";
import config from "./libs/config.js";
import axios from "axios";
import userController from "./controllers/userController.js";
import { validationResult } from 'express-validator';
import userValidators from './validators/userValidators.js';

// Setup / Configure Express
const app = express();
config(app);
connect(app);


const {X_RAPIDAPI_KEY} = process.env;

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
    "x-rapidapi-key": `${X_RAPIDAPI_KEY}`,
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
    "x-rapidapi-key": `${X_RAPIDAPI_KEY}`,
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
    "x-rapidapi-key": `${X_RAPIDAPI_KEY}`,
  },
};

app.get("/city/:cityName", (req, res) => {
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
    //     cityName == "wellington" ?
    //   res.json(
    //     {
    //     station: response.data.data[2].streams_url[0].url
    //   })
    //   :
    //   res.json(
    //     {
    //     station: response.data.data[4].streams_url[0].url
    //   })
    // })
    .catch(function (error) {
      console.error(error);
    });
});

app.post(
  '/users',
  userValidators,
  (req, res) => {
      console.log(req.body);

      const result = validationResult(req);
      if (!result.isEmpty()) {

          res.status(400);
        
          res.json({
              errors: result.errors.map(e => e.msg)
          });

          return;
      }

      // no validation errors? yeahhhh!!
      res.send("cuper cool! 😃");
  }
);



app.use("/", userController);


const PORT = process.env.PORT || 9127;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));