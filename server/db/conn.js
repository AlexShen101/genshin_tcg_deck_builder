const { MongoClient } = require("mongodb-legacy");
const Db = process.env.MONGODB_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db("stored_data");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};