// PKG IMPORTS
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const path = require("path");

// MODULE IMPORTS
const conn = require("./config/config"); //database connection

// INITIALIZATION
const PORT = process.env.PORT || 8007; // SET PORT
const app = express(); // INITIALIZE EXPRESS
conn();

//MIDDLEWARE
app.use(express.json()); // PARSE JSON
app.use(express.urlencoded({ extended: false })); // PARSE URLENCODED

//CONNECTION
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`The Server is connected to port: ${PORT}.`.cyan.underline);
  } else {
    console.log(`Connection failed: ${err}`.red);
  }
});
