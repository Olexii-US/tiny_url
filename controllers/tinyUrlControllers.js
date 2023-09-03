const { createTinyUrl, findTinyUrl } = require("../utils/tinyUrlUtils");

const postUrl = async (req, res, next) => {
  const { url } = req.body;
  console.log("------url req body---", url);

  const newTinyUrl = await createTinyUrl(url);
  if (!newTinyUrl)
    return res.status(400).json({ message: "Please enter a valid URL" });
  console.log("--------newTinyUrl in Controll---------", newTinyUrl);

  res.status(201).json(newTinyUrl);
};

const getTinyUrl = async (req, res, next) => {
  const { tinyUrl } = req.params;
  console.log("------tinyUrl---", tinyUrl);

  const originalUrl = await findTinyUrl(tinyUrl);
  if (!originalUrl) return res.status(404).json({ message: "URL not found" });

  res.status(200).json(originalUrl);
};

module.exports = {
  postUrl,
  getTinyUrl,
};
