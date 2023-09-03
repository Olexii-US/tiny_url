const Joi = require("joi");

const postUrlValidation = (req, res, next) => {
  const schema = Joi.object({
    url: Joi.string().min(3).required(),
  });
  const valodationResult = schema.validate(req.body);

  if (valodationResult.error) {
    const requiredFild = valodationResult.error.details[0].context.key;
    return res
      .status(400)
      .json({ message: `missing required '${requiredFild}' field` });
  }
  next();
};

module.exports = {
  postUrlValidation,
};
