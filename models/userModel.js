const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: false,
      trim: false,
    },
    lastName: {
      type: String,
      required: false,
      trim: false,
    },
    dob: {
      type: Date,
      required: false,
      
    },
    mobile: {
      type: String,
      required: false,
      
    },

    status: {
      type: Boolean,
      required: true,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
