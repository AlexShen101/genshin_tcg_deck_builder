
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

// get driver connection
const dbo = require("./db/conn.js");

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


app.use(require("./routes/artifactCards.js"));
app.use(require("./routes/characterCards.js"));
app.use(require("./routes/eventCards.js"));
app.use(require("./routes/statuses.js"));
app.use(require("./routes/summons.js"));
app.use(require("./routes/supportCards.js"));
app.use(require("./routes/talentCards.js"));
app.use(require("./routes/weaponCards.js"));
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});


