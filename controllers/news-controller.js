var express = require("express");
// var db = require("../models");
var router = express.Router();
var Note = require("../models/Note.js");
var Article = require("../models/Article.js");


router.get("/", function(req, res) {
    
        Article.find({}, function(error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                return res.render("index", { bacon: doc });
            }
        });
});

// router.post("/", function(req, res) {
//     db.Burger.create({
//         "name": req.body.name
//     }).then(function() {
//         res.redirect("/");
//     });
// });

// router.put("/:id", function(req, res) {
//     db.Burger.update({ devoured: req.body.devoured }, { where: { id: req.params.id } }).then(() => {
//         res.redirect("/");
//     });
// });

// router.delete("/:id", function(req, res) {
//     db.Burger.destroy({
//         where: { id: req.params.id }
//     }).then(() => {
//         res.redirect("/");
//     });
// });



module.exports = router;