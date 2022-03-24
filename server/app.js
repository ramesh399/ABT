var express = require('express');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
var multer = require('multer');
var upload = multer();

const cors = require("cors"); 

var app = express();


app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json({limit:'50mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true,limit:'50mb' }));
app.use(fileUpload());
app.use(upload.array()); 
app.use(express.static('public'));
// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application........." });
// });



app.use('/api', require('./routes/index'))

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// app.get('/', function(req, res){
//    res.send("Hello world!");
// });

// app.listen(3030);