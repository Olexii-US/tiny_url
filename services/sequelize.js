const { Sequelize } = require("sequelize");

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

async function bdTest() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
bdTest();

const UrlModel = sequelize.define(
  "urls",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    long_url: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true,
      },
    },
    short_url: {
      type: Sequelize.STRING(75),
      // validate: {
      //   isUrl: true,
      // },
    },
  },

  {
    timestamps: false,
  }
);

module.exports = UrlModel;
