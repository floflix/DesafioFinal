const express = require("express");
const transactionRouter = express.Router();
const controller = require("../services/transactionService.js");

transactionRouter.get("/", controller.findAll);
transactionRouter.get("/:id", controller.findOne);
transactionRouter.post("/", controller.create);
transactionRouter.put("/:id", controller.update);

module.exports = transactionRouter;
