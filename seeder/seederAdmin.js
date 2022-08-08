require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Users = require("../models/userModel");




//Connect to MongoDB
const URI = "mongodb+srv://ruveendra:admin@notesdb.auggj30.mongodb.net/notes?retryWrites=true&w=majority";
console.log(URI)
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
    addAdmin()
  }
);

// async () => {
      
//       const user = await Users.findOne({ email: "" });
//       if (user)
//         console.log("The email already exists")
        
//       const passwordHash = await bcrypt.hash("admin", 10);
//       const newUser = new Users({
//         email: "admin@gmail",
//         password: passwordHash,
//         status: false,
//         firstName: "default",
//         lastName: "default",
//         dob: "1900-01-01",
//         mobile: "default",
//         accountType: "admin",
//       });
//       await newUser.save();
//       console.log("success")
//       mongoose.disconnect();
      
// }

async function addAdmin  () {
    const user = await Users.findOne({ email: "" });
      if (user)
        console.log("The email already exists")
        
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
      await newUser.save();
      console.log("success")
      mongoose.disconnect();

}



// const passwordHash =  bcrypt.hash("admin", 10);

// const admin = [   
//     new Users({
//         email: "admin1@gmail",
//         password: passwordHash,
//         status: false,
//         firstName: "default",
//         lastName: "default",
//         dob: "1900-01-01",
//         mobile: "default",
//         accountType: "admin",
//     }),]






// admin.map(async (p, index) =>  {
//     await p.save((err, result) => {
//       if (index === admin.length - 1) {
//         console.log("DONE!");
//         mongoose.disconnect();
//       }
//       else if (err){
//         console.log(err);
//         mongoose.disconnect();
//       }
//       else (
//         console.log("Something went wrong")
        
//       )
//     });
//   });
