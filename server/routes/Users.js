const express = require("express");

const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Search for existing user with login credentials
userRoutes.route("/users/login").get((req, res) => {
    let db_connect = dbo.getDb("stored_data");
    let user = req.body
    let myQuery = { username: user.username, password: user.password };
    db_connect
        .collection("users")
        .findOne(myQuery, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
});

// Adds a new user to the database
userRoutes.route("/users").post((req, res) => {
    let db_connect = dbo.getDb("stored_data");
    let user = req.body
    console.log(user)
    db_connect
        .collection("users")
        .insertOne(user, (err, result) => {
            if (err) throw err;
            res.json(result);
        })
})


// Deletes a user from the database
userRoutes.route("/users/:id").delete((req, res) => {
    let db_connect = dbo.getDb("stored_data");
    let myQuery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("users")
        .deleteOne(myQuery, (err, result) => {
            if (err) throw err;
            return res.json(req.params.id);
        })
})

// Updates a user in the database
userRoutes.route("/users/:id").put((req, res) => {
    let db_connect = dbo.getDb("stored_data");
    let myQuery = { _id: ObjectId(req.params.id) };
    let newUser = {
        $set: {
            ...req.body,
            _id: ObjectId(req.params.id)
        }
    };
    db_connect
        .collection("users")
        .updateOne(myQuery, newUser, (err, result) => {
            if (err) throw err;
            return res.json(newUser.$set)
        })
})

module.exports = userRoutes;