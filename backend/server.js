const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const auth = require("./routers/auth");

const app = express();

const urlEncoderParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlEncoderParser);

app.use("/auth", auth);

const dbURI = process.env.DB_URL;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(process.env.PORT, () => {
      console.log("listening ...");
    });
  })
  .catch((err) => {
    console.log("server error", err);
  });
