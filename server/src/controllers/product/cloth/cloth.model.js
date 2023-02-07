const mongoose = require("mongoose");

const reqString = { type: String, required: true };
const reqArray = { type: Array, required: true };

const clothSchema = new mongoose.Schema({
    heading: reqString,
    description: reqString,
    gender: reqString,
    img: reqArray,
}, {
    versionKey: false
});

const cloth = mongoose.model("cloth", clothSchema);

module.exports = cloth;