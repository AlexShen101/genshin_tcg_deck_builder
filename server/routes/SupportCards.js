const express = require("express");


const supportCardRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb-legacy").ObjectId;


// This section will help you get a list of all the records.
supportCardRoutes.route("/supportCards").get((req, res) => {
  let db_connect = dbo.getDb("stored_data");
  db_connect
    .collection("support_cards")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
supportCardRoutes.route("/supportCards/:id").get((req, res) => {
  let db_connect = dbo.getDb("stored_data");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("support_cards")
    .findOne(myquery, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = supportCardRoutes;
