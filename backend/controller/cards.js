const Card = require("../models/Card.js");
const mongoose = require("mongoose");

const findCards = async (req, res) => {
  try {
    const cards = await Card.find()
      .populate("owner")
      .populate("likes")
      .orFail(new Error("No hay tarjetas"));
    res.status(200).json(cards);
  } catch (error) {
    res.status(404).json({ message: "Error al buscar tarjetas", error: error.message });
  }
};

const createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  const newCard = new Card({ name, link, owner });
  try {
    const saveCard = await newCard.save();
    return res.status(201).json(saveCard);
  } catch (error) {
    res.status(400).json({ message: "Error al crear tarjeta", error: error.message });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail(
      () => new Error("DocumentNotFound")
    );


    if (card.owner.toString() !== req.user._id) {
      return res.status(403).send({ message: "No tienes permiso para borrar esta tarjeta" });
    }

    await card.deleteOne();
        res.status(200).json({ message: "Tarjeta eliminada exitosamente", card });


  } catch (error) {
    if (error.message === "DocumentNotFound") {
      return res.status(404).send({ message: "Tarjeta no encontrada" });
    }
    res.status(500).send({ message: "Error al borrar tarjeta", error });
  }
};

const likeCard = async (req, res) => {
  const updateLikeCarde = await Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  ).populate("owner likes", "-password");
   res.status(200).json(updateLikeCarde);
};

const dislikeCard = async (req, res) => {
  const updateLikeCarde = await Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  ).populate("owner likes", "-password");;
  res.status(200).json(updateLikeCarde);
};

module.exports = { findCards, createCard, deleteCard, likeCard, dislikeCard };
