const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {celebrate} = require("celebrate");
const Joi = require("joi");
const {findUsers,getUser, userMe,getUserInfo, userAvatar, login, checkEmail} = require("../controller/users");


const {
  userUpdateValidation,
  userAvatarValidation,
  userIdValidation,
  userLoginValidation,
 
  userCheckEmailValidation,
} = require("../validator/usersValidator.js");

router.get("/", findUsers);
router.get("/me", auth,getUserInfo);
router.get("/:userId",celebrate(userIdValidation), getUser);
router.post('/check-email',celebrate(userCheckEmailValidation), checkEmail);
router.post('/login', celebrate(userLoginValidation),login);
router.patch("/me", celebrate(userUpdateValidation),auth,userMe);
router.patch("/me/avatar",celebrate(userAvatarValidation),auth, userAvatar);

module.exports = router;
