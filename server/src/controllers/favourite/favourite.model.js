const mongoose = require('mongoose');


const reqString = { type: String, required: true };
const reqNumber = { type: Number, required: true };
const reqArray = { type: Array, required: true };

const favouriteSchema = new mongoose.Schema({
    title: reqString,
    gender: reqString,
    description: reqString,
    category: reqString,
    price: reqNumber,
    size: reqArray,
    color: reqString,
    rating: reqNumber,
    img: reqArray,
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

const favourite = mongoose.model("favourite", favouriteSchema);

module.exports = favourite;