const { Schema, model, default: mongoose } = require('mongoose')


const Product = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    imageUrl: { type: String },   
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Product', Product)