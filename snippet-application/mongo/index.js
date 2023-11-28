const mongoose = require("mongoose");
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const { username, password, projectname } = require("./config.json");
const mongoURL = `mongodb+srv://${username}:${password}@cluster0.x1s1xfu.mongodb.net/${projectname}?retryWrites=true&w=majority`;


const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.log(error);
  }
};


module.exports = { connectDB };
