const UrlModel = require("../services/sequelize");

const hashedUrl = Math.random()
  .toString(32)
  .replace(/[^a-z0-9]/, "")
  .substring(2, 10);

console.log("------hashedUrl------", hashedUrl);

const createTinyUrl = async (url) => {
  try {
    // const tinyUrl = process.env.DEV_URL + "/" + hashedUrl;
    const tinyUrl = hashedUrl;
    console.log("------tinyUrl------", tinyUrl);
    const newTinyUrl = await UrlModel.create(
      {
        long_url: url,
        short_url: tinyUrl,
      },
      { fields: ["long_url", "short_url"] }
    );
    return newTinyUrl;
  } catch (error) {
    console.log(error);
  }
};

const findTinyUrl = async (tinyUrl) => {
  try {
    const fullUrl = await UrlModel.findOne({
      where: { short_url: tinyUrl },
    });
    return fullUrl;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTinyUrl,
  findTinyUrl,
};
