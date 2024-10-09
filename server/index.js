const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Set up Global configuration access
dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

// // Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(bodyParser.json());
//app.use(express.json());
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */


require("../routes/user.routes.js")(app);
require("../routes/job.routes.js")(app);
require("../routes/jobseeker.routes.js")(app);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
