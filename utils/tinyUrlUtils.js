const redis = require("../services/redis");
const UrlModel = require("../services/sequelize");

const hashedUrl = Math.random()
  .toString(32)
  .replace(/[^a-z0-9]/, "")
  .substring(2, 10);

const createTinyUrl = async (url) => {
  try {
    const tinyUrl = hashedUrl;
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
    const redisUrl = await redis.get(tinyUrl);

    if (!redisUrl) {
      const fullUrl = await UrlModel.findOne({
        where: { short_url: tinyUrl },
      });

      const longUrl = !fullUrl ? fullUrl : fullUrl.long_url;

      return longUrl;
    }
    return redisUrl;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTinyUrl,
  findTinyUrl,
};
