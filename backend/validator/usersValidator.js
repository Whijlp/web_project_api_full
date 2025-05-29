const Joi = require("joi");
const validateUrl = require("../validator/validator");

const userCreateValidation = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const userValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().custom(validateUrl),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const userLoginValidation = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const userIdValidation = {
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
};
const userCheckEmailValidation = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};
const userUpdateValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
};

const userAvatarValidation = {
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
};

module.exports = {
  userValidation,
  userLoginValidation,
  userIdValidation,
  userUpdateValidation,
  userAvatarValidation,
  userCheckEmailValidation,
  userCreateValidation
};
