var express = require("express");
var router = express.Router();
var Article = require("../models/Article.js");
var Note = require("../models/Note.js");

// the Save Note button points here
router.post("/:id", function(req, res) {
  var newNote = new Note(req.body);

  newNote.save(function(error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      Article.findOneAndUpdate({ "_id": req.params.id }, {$push: {"notes": doc._id} })
      .exec(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          res.json(doc);
        }
      });
    }
  });
});

//Remove button on note modal points here
//and removes note reference from articles mongo collection
//and removes note fromm notes mongo collection
router.post("/delete/:id", function(req, res) {

  Article.findOneAndUpdate({ "_id": req.body.artId }, {$pull: {"notes":  req.params.id} })
      .exec(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('removed note ref from notes array')
        }
      });

    Note.remove({ "_id": req.params.id})
        .exec(function(err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('removed note')
            }
        });


});

//this gets the notes for an article after clicking the Notes button
router.get("/:id", function(req, res) {
  Article.findOne({ "_id": req.params.id })
  .populate("notes")
  .exec(function(error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      console.log('doc: ' + doc);
      res.json(doc);
    }
  });
});

module.exports = router;