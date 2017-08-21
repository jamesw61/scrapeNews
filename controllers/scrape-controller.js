var express = require("express");
// var db = require("../models");
var router = express.Router();
var Article = require("../models/Article.js");
var request = require("request");
var cheerio = require("cheerio");


router.get("/", function(req, res) {
  // First, we grab the body of the html with request
  request("http://www.comingsoon.net/tv", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    // Now, we grab every h2 within an article tag, and do the following:
    $(".listed-article-container").each(function(i, element) {

      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children(".listed-article-content").children("header").children(".listed-article-title").text();
      result.link = $(this).children(".listed-article-content").children("header").children(".listed-article-title").attr("href");
      result.image = $(this).children(".listed-article-media").children("a").children("img").attr("src");

      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      var entry = new Article(result);

      // Now, save that entry to the db
      entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          console.log(doc);
        }
      });

    });
  });
  // Tell the browser that we finished scraping the text
  res.send("Scrape Complete");
});

module.exports = router;