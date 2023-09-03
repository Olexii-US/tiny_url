const express = require("express");

const { asyncWrapper } = require("../helpers/asyncWrapper");
const { postUrl, getTinyUrl } = require("../controllers/tinyUrlControllers");
const { postUrlValidation } = require("../middleware/validationMdw");

const urlRouter = express.Router();

urlRouter.post("/create-tiny-url", postUrlValidation, asyncWrapper(postUrl));

urlRouter.get("/:tinyUrl", asyncWrapper(getTinyUrl));

module.exports = urlRouter;
