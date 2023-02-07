const express = require("express");

const men = require("./men.model");

const app = express.Router();

app.get("/", async (req, res) => {
  let products = await men.find();
  res.send(products);
});
module.exports = app;