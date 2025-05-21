const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "tu_clave_secreta";

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Autorización requerida" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

module.exports = auth;