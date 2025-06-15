const express = require("express");
const passport = require("passport");
const router = express.Router();
const adminController = require("../controllers/adminController");
const isAdmin = require("../middlewares/isAdmin");


router.put("/makeAdmin" , passport.authenticate("jwt" , {session : false}) , isAdmin , adminController.makeAdminByUserId);

module.exports = router;
