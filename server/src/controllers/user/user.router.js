const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./user.model");

const app = express.Router();

app.get("/", async (req, res) => {
  try {
    let user = await User.find();
    res.send("These are the users");
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password);
    console.log(user);
    if (!user || !match) {
      return res.status(401).send("Invalid Credintial");
    }
    if (user && match) {
      const token = jwt.sign({ user }, "1234");
      return res.status(201).json({ user, token });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/signup", async (req, res) => {
  let { email } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(500)
        .json({ status: "Failed", message: "Please try with different email" });
    }
    user = await User.create(req.body);
    console.log(user);
    const token = jwt.sign({ user }, "1234");
    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "Failed" });
  }
});

async function resetpassword({ email, password }) {
  let filter = { email: email };
  let update = { password: password };
  let user = await User.findOneAndUpdate(filter, update);
  return "Password updated successfully Login Now";
}

const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: "false",
  port: 587,
  auth: {
    user: process.env.NODEMAILERUSER,
    pass: process.env.NODEMAILERPASSWORD,
  },
});

async function checkemail(email) {
  let user = await User.findOne({ email: email });

  if (user) {
    const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
    transport.sendMail({
      to: user.email,
      subject: "Password reset OTP",
      from: "venketsh@gmail.com",
      text: `Your password reset otp is ${otp}. This OTP will valid for 5 minutes.`,
    });
    return { email: user.email, otp: otp };
  } else {
    return { status: "Failed", message: "With This Email There Is No User" };
  }
}

app.post("/checkmail", async (req, res) => {
  let email = req.body.data;

  let user = await User.findOne({ email: email });

  if (user) {
    const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
    transport.sendMail({
      to: user.email,
      subject: "Password reset OTP",
      from: "venketsh@gmail.com",
      text: `Your password reset otp is ${otp}. This OTP will valid for 5 minutes.`,
    });
    return res.status(201).send({ email: user.email, otp: otp });
  } else {
    return res
      .status(500)
      .json({ status: "failed", message: "With This Email There Is No User" });
  }
});

app.post("/resetpassword", async (req, res) => {
  let password = req.body.data.password;
  let email = req.body.data.email;
  console.log(email, password);
  try {
    bcrypt.hash(password, 4, async (err, hash) => {
      console.log("hashed", hash);
      let filter = { email: email };
      let update = { password: hash };
      let user = await User.findOneAndUpdate(filter, update);
      return res.status(201).send("Password updated successfully Login Now");
    });
  } catch (error) {
    return res.send(error.message);
  }
});

module.exports = app;
