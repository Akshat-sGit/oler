const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const MainRouter = require("./routes/mainroute");
const router = express.Router();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", MainRouter);

const MONGO_URL =
  "mongodb+srv://akshatag107:AKuKImDvuuIhvo3Q@jellybean.swicqr2.mongodb.net/user_details?retryWrites=true&w=majority&appName=JellyBean";


mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to mongo Successful"))
  .catch((e) => {
    console.log("Error : " + e);
  });


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

app.get("/getUsers", (req, res) => {
  UserModel.find({}).then(function(user_details){
    res.json(user_details);
  }).catch(function(e){
    console.log(e);
  } )
});

app.post("/user_details", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.status(201).json({ message: "User details saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving user details" });
  }
});



app.listen(5001, () => console.log("Running on 5001"));



module.exports = mongoose.model("user_details", userSchema);