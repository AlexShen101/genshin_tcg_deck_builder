const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

// get driver connection
const dbo = require("./db.js");
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use(require("./routes/ArtifactCards.js"));
app.use(require("./routes/CharacterCards.js"));
app.use(require("./routes/EventCards.js"));
app.use(require("./routes/Statuses.js"));
app.use(require("./routes/Summons.js"));
app.use(require("./routes/SupportCards.js"));
app.use(require("./routes/TalentCards.js"));
app.use(require("./routes/WeaponCards.js"));
app.use(require("./routes/FirebaseImageUrls.js"));

console.log("right before dbo.connect to server");
dbo.connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      // perform a database connection when server starts
      console.log(`Server is running on port: ${port}`);
    });
  } else {
  }
});

app.get("/", (req, res) => {
  let db_connect = dbo.getDb();
  db_connect
    .collection("character_cards")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});
