const mongoose = require("mongoose");
var router = require('./routes.js');
const express = require('express');
const bodyParser = require("body-parser");
const logger = require("morgan");
const helmet = require('helmet');
const Data = require("./data");
const path = require('path');
const cors = require('cors');
const app = express();
//const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://mcdbuser:gurgaon#01@ds139944.mlab.com:39944/my_customer";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);
let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(helmet());

// Set up a whitelist and check against it:
var whitelist = ['http://localhost:5000/', 'http://localhost:3000', 'https://mycustomerapp.herokuapp.com', 'undefined']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else if(origin == undefined) {
      callback(null, true)
    } else {
      console.log(origin)
      callback(new Error('Not allowed by CORS'))
    }
  }
}
//Enable cors
app.use(cors(corsOptions));

// this is our get method
// this method fetches all available data in our database
/*router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
*/
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// append /api for our http requests
app.use("/api", router);

// Put all API endpoints under '/api'
/*app.get('/api/server/up', (req, res) => {
  response = {
      server: "running on port#5000"
  }

  // Return them as json
  res.json(response);
});
*/
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
//production mode

if(process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})



const port = process.env.PORT || 5000;

// launch our backend into a port
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));