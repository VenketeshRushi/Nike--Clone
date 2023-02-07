const express = require("express");

const kid = require("./kids.model");

const app = express.Router();

app.get("/", async (req, res) => {
  let products = await kid.find();
  res.send(products);
});
module.exports = app;