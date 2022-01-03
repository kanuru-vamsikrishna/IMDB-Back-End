const express = require("express");
const setupDB = require("./config/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./config/router");
const app = express();

const port = 4000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
setupDB();
app.use("/", router);

app.listen(port, () => {
  console.log("listening on the port", port);
});
