const express = require("express");

const women = require("./women.model");

const app = express.Router();

app.get("/", async (req, res) => {
  let products = await women.find();
  res.send(products);
});
module.exports = app;