const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
// ////////////////////
const { Sequelize } = require("sequelize");
const urlRouter = require("./routes/tinyUrl");

// ----------sequelize -------
const sequelize = new Sequelize(
  process.env.MARIA_DB_DATABASE,
  process.env.MARIA_DB_USER,
  process.env.MARIA_DB_PASS,
  {
    host: process.env.MARIA_DB_HOST,
    port: 3306,
    dialect: "mariadb",
  }
);

sequelize.define("urlModel", {
  columnA: {
    type: Sequelize.INTEGER,
    // validate: {
    //   is: ["[a-z]", "i"], // will only allow letters
    //   max: 23, // only allow values <= 23
    //   isIn: {
    //     args: [["en", "zh"]],
    //     msg: "Must be English or Chinese",
    //   },
    // },
    field: "id",
  },
  columnB: {
    type: Sequelize.STRING,
    field: "long_url",
  },
  columnC: {
    type: Sequelize.STRING(75),
    field: "short_url",
  },
});

async function bdTest() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
bdTest();
// console.log(
//   "******sequelize.models.urlMode*********l",
//   sequelize.models.urlModel
// );

// ----------- end--------------
// /////////////////////

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// ------- routes
app.use("/api", urlRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
