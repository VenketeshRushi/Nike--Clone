const mongoose = require("mongoose");

const reqString = { type: String, required: true };
const reqArray = { type: Array, required: true };

const shoeSchema = new mongoose.Schema({
    heading: reqString,
    description: reqString,
    gender: reqString,
    img: reqArray,
});

const shoe = mongoose.model("shoe", shoeSchema);

module.exports = shoe;