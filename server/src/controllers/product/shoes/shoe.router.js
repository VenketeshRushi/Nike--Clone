const express = require("express");

const shoe = require("./shoe.model");

const app = express.Router();

app.get("/", async (req, res) => {
  let products = await shoe.find();
  res.send(products);
});
module.exports = app;