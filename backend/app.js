const express = require("express");
const router = express.Router();
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const mongoose = require("mongoose");
const user = require("./models/User");
const auth = require("./middlewares/auth");
const cors = require("cors");
const { login, createUsers } = require("./controller/users");
require("dotenv").config();

const DB_HOST = process.env.DB_HOST;

const DB_NAME = process.env.DB_NAME;
mongoose.connect(`${DB_HOST}/${DB_NAME}`);

const app = express();

const PORT = process.env.PORT;

app.use(cors())
app.use(express.json());

app.use("/api/signin",login)
app.use("/api/signinup", createUsers);



app.use("/api/users", userRouter);
app.use(auth)
app.use("/api/cards", cardRouter);

app.get("*", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
