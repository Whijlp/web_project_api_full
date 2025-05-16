const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || 'mi_clave_secreta';

const login = async (req, res) => {
  try {const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña requeridos.' });

    }
const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const token = jwt.sign(
      { _id: user._id },
      SECRET_KEY,
      { expiresIn: '7d' }
    );
    res.status(200).json({ token });

} catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};


const findUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(400).send({ message: "Error al buscar usuarios", error });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user)
      return res.status(400).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(404).send({ message: "Error al buscar usuario", error });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const createUsers = async (req, res) => {
  try {
    const { name, about, avatar, email,password } = req.body;
    const newUser = new userModel({ name, about, avatar,email,password });
    const saveUser = await newUser.save();
    return res.status(201).json(saveUser);
  } catch (error) {
    res.status(400).send({ message: "Error al crear usuario", error });
  }
};

const userMe = async (req, res) => {
  const { name, about } = req.body;
  const updateUser = await userModel.findByIdAndUpdate(req.user._id, {
    name,
    about,
  });
  res.send(updateUser);
};


const userAvatar = async (req, res) => {
  const { avatar } = req.body;
  const updateAvatar= await userModel.findByIdAndUpdate(req.user._id, {
    avatar,
  });
  res.send(updateAvatar);
};

module.exports = { findUsers, createUsers, getUser,getUserInfo, userMe, userAvatar, login };
