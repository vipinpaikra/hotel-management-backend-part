const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//*work need in Schema
let userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: false,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: false,
        },
        img: {
            type: String,
        },
        city: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
