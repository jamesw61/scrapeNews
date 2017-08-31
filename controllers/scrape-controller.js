var express = require("express");
var router = express.Router();
var Article = require("../models/Article.js");
var request = require("request");
var cheerio = require("cheerio");


//the Scrape button points here
router.get("/", function(req, res) {
    var count = 0;

    request("http://www.comingsoon.net/tv", function(error, response, html) {
        var $ = cheerio.load(html);
        // length will be the number of articles scraped - it is usually 16
        var length = $(".listed-article-container").length;
        
        console.log('length', length);

        $(".listed-article-container").each(function(i, element) {
            var result = {};
            result.title = $(this).children(".listed-article-content").children("header").children(".listed-article-title").text();
            result.link = $(this).children(".listed-article-content").children("header").children(".listed-article-title").attr("href");
            result.image = $(this).children(".listed-article-media").children("a").children("img").attr("src");

            var entry = new Article(result);

            console.log('before save i', i);
            entry.save(function(err, doc) {

                if (err) {
                // console.log(err);
            // Until i is equal to one less than the number of articles scraped
            // Basically, when i=15 and length=16, it will console log the  
            // count to the node console

            //Actually not really  - I just realized that that these if and else 
            //lines are asynchronous but that's another issue - the responses won't 
            //even give me the wrong answer - or any sign of life for that matter
            //If I were able to get the correct count, how do I get it back to the 
            //browser?
                    console.log('if err i', i);
                    if (i === (length - 1)) {
                        console.log('i', i);
                        console.log('length', length)
                        console.log('err loop done, count:', count);
                        //None of these do anything
                        // res.json(count);   
                         // res.redirect("/");
                         res.send('scraped');
                    } 
                } 

                else {
                    count++;
                    console.log('else i', i);
                    if (i === (length - 1)) {
                        console.log('i', i);
                        console.log('length', length)
                        console.log('noErr loop done, count:', count);
                        //Nor do any of these
                        // res.json(count);
                       // res.redirect("/");
                       res.send('scraped');

                    } 
                }

            });

        });

    });
    //These all work but before the request and save functions call back

    //returns 0 to the browser console:
    // res.json(count);

    //I assume this works even though it looks like it doesn't do anything
    // res.redirect("/");

    //This says scraped but its lying - it doesn't really know if the scrape worked
    // res.send('scraped'); 

});


module.exports = router;