var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var port = process.env.PORT || 3000;

mongoose.Promise = Promise;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// mongoose.connect("mongodb://heroku_z2rz24m6:sj29b4n8g08g47q21gp5sijj9e@ds151222.mlab.com:51222/heroku_z2rz24m6");

mongoose.connect("mongodb://localhost/tvNews", {
  useMongoClient: true
});

var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//handles getting and deleting articles from Mongo
const news = require("./controllers/news-controller.js");
//handles the scrape
const scrape = require("./controllers/scrape-controller.js");
//handles getting, adding, and deleting notes
const notes = require("./controllers/notes-controller.js");
//handles saving and unsaving articles
const saved = require("./controllers/saved-controller.js");

app.use("/", news);
app.use("/scrape", scrape);
app.use("/notes", notes);
app.use("/saved", saved);


app.listen(port, function() {
  console.log("App running on port " + port);
});
