const mongoose = require('mongoose');

const sellerScrema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        username: String,
        passaword: String
    }
});

const Seller = mongoose.model('Seller', sellerScrema);

module.exports = Seller;