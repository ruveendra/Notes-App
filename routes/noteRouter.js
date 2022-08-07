const router = require("express").Router();

router.route("/").get((req, res) =>
  res.json({
    msg: "Test Notes",
  })
);

module.exports = router;
