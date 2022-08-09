require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Users = require("../models/userModel");

//Connect to MongoDB
const URI =
  "mongodb+srv://ruveendra:admin@notesdb.auggj30.mongodb.net/notes?retryWrites=true&w=majority";
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
    addAdmin();
  }
);

async function addAdmin() {
  const passwordHash = await bcrypt.hash("admin", 10);
  const newUser = new Users({
    email: "admin@gmail",
    password: passwordHash,
    status: false,
    firstName: "default",
    lastName: "default",
    dob: "1900-01-01",
    mobile: "default",
    accountType: "admin",
  });

  const user = await Users.findOne({ email: "" });
  if (user) console.log("The email already exists");

  await newUser.save();
  console.log("success");
  mongoose.disconnect();
}
