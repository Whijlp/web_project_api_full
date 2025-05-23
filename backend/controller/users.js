const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "tu_clave_secreta";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña requeridos." });
    }
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: "7d" });
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};

const checkEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    res.send({ exists: !!user });
  } catch (err) {
    res.status(500).send({ message: "Error interno del servidor" });
  }
}

const findUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send({ message: "Error al buscar usuarios", error });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user)
      return res.status(400).json({ message: "Usuario no encontrado" });
    res.status(200).json(user);
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

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const createUsers = async (req, res) => {
  try {
    const { name, about, avatar, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });

    const saveUser = await newUser.save();
    const { password: _, ...userWithoutPassword } = saveUser.toObject();

    return res.status(201).json(userWithoutPassword);;
  } catch (error) {
    res.status(400).send({ message: "Error al crear usuario", error });
  }
};

const userMe = async (req, res) => {
  const { name, about } = req.body;
  const updateUser = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json(updateUser);
};

const userAvatar = async (req, res) => {
  const { avatar } = req.body;
  const updateAvatar = await userModel.findByIdAndUpdate(req.user._id, {
    avatar,
  });
 return res.send(updateAvatar);
};

module.exports = {
  findUsers,
  createUsers,
  getUser,
  getUserInfo,
  userMe,
  userAvatar,
  login,
  checkEmail,
};
