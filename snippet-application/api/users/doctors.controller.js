const util = require("../util");
const Doctor = require("./doctors.model");
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // If using body-parser
const session = require("express-session");
const Record = require('./patientRecord.model');
const Patient = require('./users.model');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const createUser = async (req, res) => {
  const body  = req.body;
  try {
    const doctorDoc = new Doctor(body);
    console.log(body);
    const user = await doctorDoc.save();
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
  } catch (error) {
    if (error.code === 11000) {
      console.log(error);
      res.status(400).json({ error: "Username already exists" });
    } else {
      res.status(500).json({ error: error.toString() });
    }
  }
};

const doctorLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await Doctor.findOne({ email: email });
    if (user) {
      if(user.password === password)
      req.session.userId = user._id;
      req.session.userType = "Doctor";
      res.sendFile(path.join(__dirname, 'public', 'doctorPage.html'));
    } else {
      res.status(404).json({ error: `Invalid username or password: ` });
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Username already exists" });
    } else {
      res.status(500).json({ error: error.toString() });
    }
  }
};

const getReg = async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
};

const getLogin = async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
};

const getPatientData = async (req,res) =>{
  try {
    console.log("Getting data");
    const records = await Record.find();
    if (records) {
     res.json(records) ;
    } else {
      console.log("No data found");
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Username already exists" });
    } else {
      res.status(500).json({ error: error.toString() });
    }
  }
}


const getPatientName  = async (req,res)=>{
  try {
    console.log("Getting data");
    let userId = req.params.userId;
    const records = await Patient.findOne({user_id :userId});
    if (records) {
     res.json(records.user_id) ;
    } else {
      console.log("No data found");
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Username already exists" });
    } else {
      res.status(500).json({ error: error.toString() });
    }
  }
}
module.exports = {
  createUser,
  getReg,
  doctorLogin,
  getLogin,
  getPatientData
};
