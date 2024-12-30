const mongoose =require('mongoose');

const USERSchema=mongoose.Schema({
    name: String,
    email: String,
    password: String,
    googleId: String,
})

module.exports = mongoose.model('User', USERSchema);
