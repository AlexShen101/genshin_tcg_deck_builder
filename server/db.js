const { MongoClient } = require("mongodb-legacy");
const Db = process.env.MONGODB_URI;

var _db;

module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(Db).then((client) => {
      _db = client.db('stored_data')
      return callback()
    })
    .catch((err) => {
      console.log(err)
      return callback(err)
    })
  },

  getDb: function () {
    console.log("in getDb: conn.js")
    return _db;
  },
};