const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

// get driver connection
const dbo = require("./db.js");
const port = process.env.PORT || 8080;

// test from tut
const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/build");

app.use(express.static(buildPath)); // from tut

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get('/', (req, res) => res.send('Hello world!'));

app.get("/*", function(req, res){

  res.sendFile(
      path.join(__dirname, "../client/build/index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );

})

app.use(require("./routes/ArtifactCards.js"));
app.use(require("./routes/CharacterCards.js"));
app.use(require("./routes/EventCards.js"));
app.use(require("./routes/Statuses.js"));
app.use(require("./routes/Summons.js"));
app.use(require("./routes/SupportCards.js"));
app.use(require("./routes/TalentCards.js"));
app.use(require("./routes/WeaponCards.js"));
app.use(require("./routes/FirebaseImageUrls.js"));

dbo.connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      // perform a database connection when server starts
      console.log(`Server is running on port: ${port}`);
    });
  } else {
  }
});

