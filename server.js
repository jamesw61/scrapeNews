var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Requiring our Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
// Our scraping tools
// var request = require("request");
// var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/tvNews", {
  useMongoClient: true
});
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Routes
// ======
const news = require("./controllers/news-controller.js");
const scrape = require("./controllers/scrape-controller.js");
const notes = require("./controllers/notes-controller.js");
const saves = require("./controllers/saves-controller.js");

app.use("/", news);
app.use("/scrape", scrape);
app.use("/notes", notes);
app.use("/saves", saves);


// A GET request to scrape the echojs website



// // This will get the articles we scraped from the mongoDB
// app.get("/articles", function(req, res) {
//   // Grab every doc in the Articles array
//   Article.find({}, function(error, doc) {
//     // Log any errors
//     if (error) {
//       console.log(error);
//     }
//     // Or send the doc to the browser as a json object
//     else {
//       res.json(doc);
//     }
//   });
// });

// // Grab an article by it's ObjectId



// // Create a new note or replace an existing note



// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
