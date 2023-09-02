const express = require("express");

const { asyncWrapper } = require("../helpers/asyncWrapper");
const { postUrl } = require("../controllers/tinyUrlControllers");
// const {
//   postContactValidation,
//   putContactValidation,
//   favoriteContactValidation,
//   queryContactValidation,
// } = require("../../middleware/validationMdlw");

const urlRouter = express.Router();

urlRouter.post(
  "/create-tiny-url",
  //   postContactValidation,
  asyncWrapper(postUrl)
);
// router.get("/", queryContactValidation, asyncWrapper(getContacts));

module.exports = urlRouter;
