var express = require("express");
var router = express.Router();
var Article = require("../models/Article.js");
var request = require("request");
var cheerio = require("cheerio");

//the Scrape button points here
router.get("/", function(req, res) {
    request("http://www.comingsoon.net/tv", function(error, response, html) {
            var $ = cheerio.load(html);          
            $(".listed-article-container").each(function(i, element) {
                  var result = {};
                  result.title = $(this).children(".listed-article-content").children("header").children(".listed-article-title").text();
                  result.link = $(this).children(".listed-article-content").children("header").children(".listed-article-title").attr("href");
                  result.image = $(this).children(".listed-article-media").children("a").children("img").attr("src");
                  var entry = new Article(result);
                  entry.save(function(err, doc) {
                      if (err) {
                        console.log(err);
                      }
                      else {
                        console.log(doc);
                      }
                      
                  });
                                 
             });
        return res.redirect("/");
    });

});

module.exports = router;