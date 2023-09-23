const path = require('path')
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

// get driver connection
const dbo = require("./db/conn.js");

const port = process.env.PORT || 8080;

app.use(cors(
  {
        origin: ["*"],
    }
));
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

app.get('/', (req, res) => {
  let db_connect = dbo.getDb();
  // console.log(db_connect)
  res.json("test");
})

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.log(err); // something else here
  });
  console.log(`Server is running on port: ${port}`);
});
