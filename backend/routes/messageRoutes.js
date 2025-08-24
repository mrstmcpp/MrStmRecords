const express = require("express");
const router = express.Router();
const passport = require("passport");
const MessageController = require("../controllers/messageController")

router.get("/users",  MessageController.getUserForSideBar);
router.get("/:id", passport.authenticate("jwt", { session: false }), MessageController.getMessages);
router.post("/send/:id", passport.authenticate("jwt", { session: false }), MessageController.sendMessage);

module.exports = router;