const mongoose = require("mongoose");


const restaurantSchema = new mongoose.Schema({
    name:String,
    address:String,
    neighborhood:String,
    cuisine:String,
    photograph:String
});

module.exports = mongoose.model('restaurant', restaurantSchema);