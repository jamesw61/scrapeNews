var express = require("express");
var router = express.Router();
var Note = require("../models/Note.js");
var Article = require("../models/Article.js");


router.get("/", function(req, res) {
        Article.find({}).sort({"_id": -1}).limit(20)
        .exec(function(error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                return res.render("index", { bacon: doc });
            }
        });
});

router.post("/delete/:id", function(req, res) {
        console.log(req.params.id);
        Article.remove({ "_id": req.params.id})
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