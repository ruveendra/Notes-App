const router = require("express").Router();
auth = require("../middleware/auth");
const noteCtrl = require("../controllers/noteCtrl");

// prettier-ignore
router.route("/")
    .get(auth, noteCtrl.getNotes)
    .post(auth, noteCtrl.createNote);

router
  .route("/:id")
  .get(auth, noteCtrl.getNote)
  .put(auth, noteCtrl.updateNote)
  .delete(auth, noteCtrl.deleteNote);

module.exports = router;
