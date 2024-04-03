const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const MainRouter = require("./routes/mainroute");

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", MainRouter);

const MONGO_URL = "mongodb+srv://akshatag107:AKuKImDvuuIhvo3Q@jellybean.swicqr2.mongodb.net/user_details?retryWrites=true&w=majority&appName=JellyBean";

// AKuKImDvuuIhvo3Q

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to mongo Successful"))
  .catch((e) => {
    console.log("Error : " + e);
  });

app.listen(5001, () => console.log("Running on 5000"));
