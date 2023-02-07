const express = require("express");

const allProduct = require("./allProduct.model");

const app = express.Router();

app.get("/", async (req, res) => {
  let products = await allProduct.find();
  res.send(products);
});
module.exports = app;
