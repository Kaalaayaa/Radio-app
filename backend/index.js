import express from 'express';
import connect from "./libs/config.js";
import config from './libs/config.js';


// Setup / Configure Express
const app = express();
config(app)
connect(app)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))