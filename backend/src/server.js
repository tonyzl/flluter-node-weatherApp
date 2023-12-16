require('dotenv').config();

const express = require("express");
const axios = require("axios");

const {
  API_KEY
} = process.env;


//app config
const app = express();
const port = 4000;

//middleware configuration
app.use(express.json());

//api routes
//GET

app.get("/",  (req, res) => {
  res.send("Conexion establecida");
});

app.get("/api/:name", async (req, res) => {
  try {
    const name = req.params.name;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${API_KEY}`
    );
    const data = response.data;
    console.log('200'+name);  
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

//Listeners
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
