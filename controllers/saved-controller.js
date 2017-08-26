var express = require("express");
var router = express.Router();
var Article = require("../models/Article.js");

//gets saved articles for the /saved route
router.get("/", function(req, res) {
	Article.find({ "saved": true }, function(error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                return res.render("index", { bacon: doc });
            }
        });
});

//updates an article's saved property to true
router.post("/:id", function(req, res) {
		console.log(req.params.id);
        Article.findOneAndUpdate({ "_id": req.params.id},{"saved": true})
        .exec(function(err, doc) {
            if (err) {
                console.log(err);
            }
            else {
               res.redirect("/"); 
            }
        });
});

//updates an article's saved property to false
router.post("/unsave/:id", function(req, res) {
        console.log(req.params.id);
        Article.findOneAndUpdate({ "_id": req.params.id},{"saved": false})
        .exec(function(err, doc) {
            if (err) {
                console.log(err);
            }
            else {
               res.redirect("/"); 
            }
        });
});



module.exports = router;