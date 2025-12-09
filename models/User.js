const { Schema, model, default: mongoose } = require('mongoose')

const User = new mongoose.Schema({
    name: { type: String, required: true},
    surname: { type: String, required: true},
    phoneNumber: { type: Number},
    password: { type: String, required: true},
    adres: { type: String},
    email: { type: String, required: true, unique: true}
})

module.exports = mongoose.model('User', User)