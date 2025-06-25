const express = require("express");
const passport = require("passport");
const router = express.Router();
const chatController = require("../controllers/chatController")

router.get("/:user1/:user2" , chatController.getChatHistory);

module.exports = router;