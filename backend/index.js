import express from "express";
import connect from "./libs/database.js";
import config from "./libs/config.js";
import cityController from "./controllers/cityController.js";
import userController from "./controllers/userController.js";
import errorController from "./controllers/errorController.js";


// Setup / Configure Express
const app = express();
config(app);
connect(app);

// for changing radio station based on city
app.use("/city", cityController);

// for registration, login and adding comments (only logged in users can see comments and add comments)
app.use("/", userController);

// Global error handler
app.use(errorController);


const PORT = process.env.PORT || 9127;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));