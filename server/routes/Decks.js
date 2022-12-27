const express = require("express");

const deckRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// Gets a list of all the decks in the database
deckRoutes.route("/decks").get((req, res) => {
    let db_connect = dbo.getDb("stored_data");
    db_connect
        .collection("decks")
        .find({})
        .toArray((err, result) => {
            if (err) throw err;
            res.json(result);
        });
});

// Gets a single deck using the id provided
deckRoutes.route("/decks/:id").get((req, res) => {
    let db_connect = dbo.getDb("stored_data");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("decks")
        .findOne(myquery, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
});

// Adds a new deck to the database
deckRoutes.route("/decks").post((req, res) => {
    let db_connect = dbo.getDb("stored_data");
    let deck = req.body

    db_connect
        .collection("decks")
        .insertOne(deck, (err, result) => {
            if (err) throw err;
            res.json(result);
        })
})


// Deletes a deck to the database
deckRoutes.route("/decks/:id").delete((req, res) => {
    let db_connect = dbo.getDb("stored_data");
    let myquery = { _id: ObjectId(req.body.id) };
    db_connect
        .collection("decks")
        .deleteOne(myquery, (err, result) => {
            if (err) throw err;
            res.json(result);
        })
})

// Updates a deck in the database
deckRoutes.route("/decks/:id").put((req, res) => {
    let db_connect = dbo.getDb("stored_data");
    let deck = {}
    db_connect
        .collection("decks")
        .updateOne(deck, (err, result) => {
            if (err) throw err;
            res.json(result);
        })
})

module.exports = deckRoutes;