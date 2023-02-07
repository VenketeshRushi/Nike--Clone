const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://raman:raman@cluster0.fm7rpoi.mongodb.net/ecom",
    { useNewUrlParser: true }
  );
};

module.exports = connect;
