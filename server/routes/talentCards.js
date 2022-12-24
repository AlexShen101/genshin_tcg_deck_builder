const express = require("express");
 

const talentCardRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
talentCardRoutes.route("/talentCards").get(function (req, res) {
 let db_connect = dbo.getDb("stored_data");
 db_connect
   .collection("talent_cards")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
talentCardRoutes.route("/talentCards/:id").get(function (req, res) {
 let db_connect = dbo.getDb("stored_data");
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("talent_cards")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

module.exports = talentCardRoutes;