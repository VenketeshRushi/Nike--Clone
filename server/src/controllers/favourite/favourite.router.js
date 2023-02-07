const express = require("express");

const favourite = require("../favourite/favourite.model");
const {
  postFavourite,
  getFavourites,
  deleteOne,
} = require("../crud.controller");
const authorization = require("../../middlewares/authorization");

const checkDuplicateFavourite = require("../../middlewares/checkDuplicateFavourite");

const app = express.Router();

app.post("/", authorization, checkDuplicateFavourite, postFavourite(favourite));

app.get("/", authorization, getFavourites(favourite));

app.delete("/:id", deleteOne(favourite));

module.exports = app;
