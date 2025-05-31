const express = require("express");
const router = express.Router();
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const mongoose = require("mongoose");
const user = require("./models/User");
const auth = require("./middlewares/auth");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const { login, createUsers } = require("./controller/users");
const {celebrate,errors} = require("celebrate");
const { logRequest } = require("./middlewares/logger")
const { userCreateValidation, userLoginValidation} = require("./validator/usersValidator");
require("dotenv").config();

const DB_HOST = process.env.DB_HOST;

const DB_NAME = process.env.DB_NAME;
mongoose.connect(`${DB_HOST}/${DB_NAME}`);

const app = express();

const PORT = process.env.PORT;

const allowedCors = [
  'https://tripleten.tk',
  'http://tripleten.tk',
  'http://localhost:3000'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedCors.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  const log = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    body: req.body,
  };
  logRequest(log);
  next();
});


app.use("/api/signin", celebrate(userLoginValidation),login)
app.use("/api/signinup",celebrate( userCreateValidation), createUsers);

app.use("/api/users", userRouter);

app.use(auth)
app.use("/api/cards", cardRouter);

app.get("*", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.use(errors());
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
