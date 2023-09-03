const { createTinyUrl, findTinyUrl } = require("../utils/tinyUrlUtils");
const redis = require("../services/redis");

// const DEFAULT_EXPIRATION = 60 * 60 * 24;

const postUrl = async (req, res, next) => {
  const { url } = req.body;

  const newTinyUrl = await createTinyUrl(url);
  if (!newTinyUrl)
    return res.status(400).json({ message: "Please enter a valid URL" });

  await redis.set(newTinyUrl.short_url, newTinyUrl.long_url);
  // await redis.setex("urls", DEFAULT_EXPIRATION, JSON.stringify(newTinyUrl));
  res.status(201).json(newTinyUrl);
};

const getTinyUrl = async (req, res, next) => {
  const { tinyUrl } = req.params;

  const originalUrl = await findTinyUrl(tinyUrl);

  if (!originalUrl) return res.status(404).json({ message: "URL not found" });

  res.status(200).json(originalUrl);
};

module.exports = {
  postUrl,
  getTinyUrl,
};
