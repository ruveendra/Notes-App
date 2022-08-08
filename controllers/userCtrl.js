const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  registerUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email: email });
      if (user)
        return res.status(400).json({ msg: "The email already exists." });

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        email: email,
        password: passwordHash,
        status: true,
        firstName: "default",
        lastName: "default",
        dob: "1900-01-01",
        mobile: "default",
      });
      await newUser.save();
      res.json({ msg: "Sign up Success" });
      //res.json({ passwordHash });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { firstName, lastName, dob, mobile, newPassword } = req.body;
      const password = await bcrypt.hash(newPassword, 10);
      console.log(firstName, lastName, dob, mobile, newPassword);
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          firstName,
          lastName,
          dob,
          mobile,
          password,
          status: false,
        }
      );
      res.json({ msg: "Updated Successfully" });

      //res.json({ passwordHash });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

      const payload = {
        id: user._id,
        name: user.username,
        status: user.status,
      };

      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
      });
      res.json({ token, payload });
      //res.json({ msg: "Login User" });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  verifiedToken: (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.send(false);

      jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
        if (err) return res.send(false);

        const user = await Users.findById(verified.id);
        if (!user) return res.send(false);

        return res.send(true);
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
