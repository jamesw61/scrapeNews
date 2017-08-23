var express = require("express");
// var db = require("../models");
var router = express.Router();
var Article = require("../models/Article.js");

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

router.post("/:id", function(req, res) {
		console.log(req.params.id);
		// let x = 'ObjectId("' + req.params.id + '")';
		// console.log(x);
        Article.findOneAndUpdate({ "_id": req.params.id},{"saved": true})
        .exec(function(err, doc) {
            if (err) {
                console.log(err);
            }
            else {
               res.redirect('/saves'); 
            }
        });
});

module.exports = router;