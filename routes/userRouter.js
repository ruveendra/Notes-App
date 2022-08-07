const router = require("express").Router();

//Register User
router.post("/register", (req, res) => {
  res.json({ msg: "Register a User" });
});

router.post("/login", (req, res) => {
  res.json({ msg: "Login User" });
});

module.exports = router;
