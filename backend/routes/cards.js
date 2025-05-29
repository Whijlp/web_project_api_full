const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { findCards, createCard,deleteCard,likeCard, dislikeCard } = require("../controller/cards");
const { celebrate } = require("celebrate");
const { cardValidation, cardIdValidation } = require("../validator/cardsValidator");

router.get("/", findCards);
router.post("/",celebrate(cardValidation), createCard);
router.delete("/:cardId",celebrate(cardIdValidation), deleteCard);
router.put("/:cardId/likes",celebrate(cardIdValidation), likeCard);
router.delete("/:cardId/likes",celebrate(cardIdValidation),auth, dislikeCard);

module.exports = router;
