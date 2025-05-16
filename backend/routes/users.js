const express = require("express");
const router = express.Router();

const {findUsers,getUser, userMe,getUserInfo, userAvatar, login} = require("../controller/users");
const { get } = require("mongoose");

router.get("/users", findUsers);
router.get("/me", auth,getUserInfo);
router.get("/users/:userId", getUser);
router.post('/login', login);
router.patch("/users/me", userMe);
router.patch("/users/me/avatar", userAvatar);

module.exports = router;
