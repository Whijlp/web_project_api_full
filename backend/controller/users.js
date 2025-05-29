const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const SECRET_KEY = process.env.JWT_SECRET || "tu_clave_secreta";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Email y contraseña requeridos.");
    }
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      throw new UnauthorizedError("Credenciales inválidas.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError("Credenciales inválidas.");
    }

    const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: "7d" });
    res.send({ token });
  } catch (error) {
    next(error);
  }
};

const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    res.send({ exists: !!user });
  } catch (error) {
    next(new BadRequestError("Error al verificar el email"));
  }
};

const findUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    next(new BadRequestError("Error al buscar usuarios"));
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user) throw new NotFoundError("Usuario no encontrado");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");

    if (!user) {
      throw new NotFoundError("Usuario no encontrado");
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const createUsers = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError(" Email y contraseña son requeridos.");
    }

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

    res.send(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

const userMe = async (req, res) => {
  try {
    const { name, about } = req.body;
    const updateUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      throw new NotFoundError("Usuario no encontrado");
    }
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

const userAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updateAvatar = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        avatar,
      },
      {
        new: true,
      }
    );
    if (!updateAvatar) {
      throw new NotFoundError("Usuario no encontrado");
    }
    res.send(updateAvatar);
  } catch (error) {
    next(error);
  }
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
