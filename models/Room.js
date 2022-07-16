const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//*work need in Schema
let roomSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        maxPeople: {
            type: Number,
            required: true,
        },
        roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
