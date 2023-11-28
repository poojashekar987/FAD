// 1. run: npm install
// 2. use: the thunder client JSON file and import into Thunder Client collections
// 3. run: npm run start
const express = require("express");
const path = require('path');
const mongo = require("./snippet-application/mongo");
const session = require('express-session');
const bodyParser = require('body-parser'); // If using body-parser


const app = express();

const PORT = 8080;


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
// Set up express-session
app.use(session({
  secret: '12345', // Secret key for signing the session ID cookie
  resave: false, // Avoid resaving sessions that haven't been modified
  saveUninitialized: false, // Don't save uninitialized sessions
  cookie: { secure: false } // Set true if using HTTPS, otherwise false
}));


const users = require("./snippet-application/api/users/users.route.js");
const doctors = require("./snippet-application/api/users/doctors.route.js");

app.use("/patient", users);
app.use("/doctor", doctors);


app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  await mongo.connectDB();
 
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'snippet-application','home.html'));
});