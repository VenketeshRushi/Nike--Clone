const express = require("express");

const cloth = require("./cloth.model");

const app = express.Router();

app.get("/", async (req, res) => {
  let products = await cloth.find();
  res.send(products);
});
module.exports = app;