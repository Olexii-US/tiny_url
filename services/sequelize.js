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

console.log("sequelize.models.urlModel", sequelize.models.urlModel);
