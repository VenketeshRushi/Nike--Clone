const express = require("express");

const Order = require("./order.model");

const authorization = require("../../middlewares/authorization");

const app = express.Router();

app.post("/", authorization, async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, user: req.user._id });

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.get("/", authorization, async (req, res) => {
  try {
    const order = await Order.find({ user: req.user._id }).lean().exec();

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = app;
