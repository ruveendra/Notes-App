const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

//Register User
router.post("/register", userCtrl.registerUser);
//Login User
router.post("/login", userCtrl.loginUser);
//Update User
router.put("/update",auth, userCtrl.updateUser);
//Get Users
router.get("/", userCtrl.getUsers);
//Get User
router.get("/:id", userCtrl.getUser);
//Verify token
router.get("/verify", userCtrl.verifiedToken);


module.exports = router;
