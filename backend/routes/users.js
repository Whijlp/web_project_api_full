const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {findUsers,getUser, userMe,getUserInfo, userAvatar, login, checkEmail} = require("../controller/users");
//const { get } = require("mongoose");

router.get("/users", findUsers);
router.get("/me", auth,getUserInfo);
router.get("/users/:userId", getUser);
router.post('/check-email', checkEmail);
router.post('/login', login);
router.patch("/users/me", auth,userMe);
router.patch("/users/me/avatar",auth, userAvatar);

module.exports = router;
