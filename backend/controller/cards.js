const Card = require("../models/Card.js");
const mongoose = require("mongoose");

const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const findCards = async (req, res, next) => {
  try {
    const cards = await Card.find()
      .populate("owner")
      .populate("likes")
      .orFail(new Error("No hay tarjetas"));
    res.status(200).json(cards);
  } catch (error) {
    next(new NotFoundError("Error al buscar tarjetas", error.message));
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  const newCard = new Card({ name, link, owner });
  try {
    const saveCard = await newCard.save();
    return res.status(201).json(saveCard);
  } catch (error) {
    next(new BadRequestError("Error al crear tarjeta"));
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail(
      () => new Error("DocumentNotFound")
    );

    if (card.owner.toString() !== req.user._id) {
     next(new ForbiddenError("No tienes permiso para borrar esta tarjeta" ));
    }

    await card.deleteOne();
    res.status(200).json({ message: "Tarjeta eliminada exitosamente", card });
  } catch (error) {
    if (error.message === "DocumentNotFound") {
      return res.status(404).send({ message: "Tarjeta no encontrada" });
    }
    next({ message: "Error al borrar tarjeta", error });
  }
};

const likeCard = async (req, res) => {
  try{const updateLikeCarde = await Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  ).populate("owner likes", "-password");
  res.status(200).json(updateLikeCarde);}
  catch{
    next(new BadRequestError("Error al dar like a la tarjeta"));
  }
};

const dislikeCard = async (req, res) => {
 try{ const updateLikeCarde = await Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  ).populate("owner likes", "-password");
  res.status(200).json(updateLikeCarde);}
  catch {
    next(new BadRequestError("Error al quitar like a la tarjeta"));
  }
};

module.exports = { findCards, createCard, deleteCard, likeCard, dislikeCard };
