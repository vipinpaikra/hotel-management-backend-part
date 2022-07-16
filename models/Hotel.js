const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HotelSchema = new Schema({
    name: {
        type: String,
       
    },
    type: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        
    },
    address: {
        type: String,
      
    },
    distance: {
        type: String,
    },
    photos: {
        type: [String],
    
    },
    title: {
        type: String,
        
    },
    desc: {
        type: String,
   
    },
    rating: {
        type: String,
        min: 0,
        max: 5,
    },
    rooms: {
        type: [String],
    },
    cheapestPrice: {
        type: Number,
   
    },
    featured: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Hotel", HotelSchema);
