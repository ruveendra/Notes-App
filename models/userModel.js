const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: false,
    },
    dob: {
      type: Date,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      
    },
    accountType: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      required: true,
      
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
