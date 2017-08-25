var express = require("express");
// var db = require("../models");
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
        // let x = 'ObjectId("' + req.params.id + '")';
        // console.log(x);
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