const { createTinyUrl } = require("../utils/tinyUrlUtils");

const postUrl = async (req, res, next) => {
  const { url } = req.body;
  console.log("------url req body---", url);
  console.log(
    "******sequelize.models.urlMode*********l",
    sequelize.models.urlModel
  );

  const newTinyUrl = await createTinyUrl(url);
  res.status(201).json(newTinyUrl);
};

module.exports = {
  postUrl,
};
