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

const MONGO_URL =
  "mongodb+srv://akshatag107:AKuKImDvuuIhvo3Q@jellybean.swicqr2.mongodb.net/user_details?retryWrites=true&w=majority&appName=JellyBean";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  source: {
    type: String,
    required: true,
    trim: true,
  },
  destination: {
    type: String,
    required: true,
    trim: true,
  },
  car: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

const UserModel = mongoose.model("user_details", userSchema);

app.get("/user_details", (req, res) => {
  UserModel.find({}).then(function(user_details){
    res.json(user_details);
  }).catch(function(e){
    console.log(e);
  } )
});

// module.exports = mongoose.model("user_details", userSchema);


mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to mongo Successful"))
  .catch((e) => {
    console.log("Error : " + e);
  });

app.listen(5001, () => console.log("Running on 5001"));
