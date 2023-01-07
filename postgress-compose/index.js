const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(bodyParser.json());

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST || "localhost",
  port: DB_PORT || 5432,
  dialect: "postgres",
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
});

User.sync();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/users", function (req, res) {
  User.findAndCountAll()
    .then((data) => res.json(data))
    .catch((e) => res.status(500).json(e));
});

app.post("/users", function (req, res) {
  User.create(req.body)
    .then((data) => res.status(201).json(data))
    .catch((e) => res.status(500).json(e));
});

app.listen(3000);
