const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(validator.isEmail(value) === false){throw new Error("Invalid e-mail id")}
        }
    },
    phone: {
        type: Number,
        require: true,
        minlength: 10
    },
    message: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Creating a Collection
const User = mongoose.model("User", userSchema);

// Exporting to app.js
module.exports = User;