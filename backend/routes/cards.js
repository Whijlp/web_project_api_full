const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { findCards, createCard,deleteCard,likeCard, dislikeCard } = require("../controller/cards");

router.get("/", findCards);
router.post("/", createCard);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes",auth, dislikeCard);

module.exports = router;
