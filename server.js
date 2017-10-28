// set up ======================================================================
var express = require("express");

//Import the mongoose module
var mongoose = require("mongoose");
//Set up default mongoose connection
var mongoDB = "mongodb://localhost:27017/portfolio";
mongoose.connect(mongoDB, {
  useMongoClient: true
});
//Get the default connection
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function callback() {
  console.log("MongoDB connected");
});

var app = require("express")();
// var expressMongoDb = require('express-mongo-db');
// app.use(expressMongoDb('mongodb://localhost:27017/portfolio'));

var path = require("path");
var request = require("request");
var bodyParser = require("body-parser");

var port = process.env.PORT || 3001; // set the port
// configuration ===============================================================
app.use(express.static(path.join(__dirname, "build"))); // set the static files location /public/img will be /img for users
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// routes ======================================================================
require("./app/routes.js")(app);

// listen (start app with node server.js) ======================================
var server = app.listen(port);
console.log("App listening on port " + port);

// Make a socket
require('./app/sockets')(server);
