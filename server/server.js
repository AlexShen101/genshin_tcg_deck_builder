const path = require('path')
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

// get driver connection
const dbo = require("./db/conn.js");

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(require("./routes/ArtifactCards.js"));
app.use(require("./routes/CharacterCards.js"));
app.use(require("./routes/EventCards.js"));
app.use(require("./routes/Statuses.js"));
app.use(require("./routes/Summons.js"));
app.use(require("./routes/SupportCards.js"));
app.use(require("./routes/TalentCards.js"));
app.use(require("./routes/WeaponCards.js"));
app.use(require("./routes/FirebaseImageUrls.js"));

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
