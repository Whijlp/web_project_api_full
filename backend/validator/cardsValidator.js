const validateUrl = require('./validator');
const Joi = require('celebrate').Joi;

const cardValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validateUrl),
  }),
};

const cardIdValidation = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  cardValidation,
  cardIdValidation,
};