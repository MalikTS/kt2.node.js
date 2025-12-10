const path = require('path')
const express = require('express')
require ('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const { json } = require('body-parser')

const authRouter = require('./routers/authRouter');     
const productRouter = require('./routers/productRouter');


const PORT = process.env.PORT || 3000

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/tic'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter);
app.use('/api', productRouter);

app.get('/api', (req, res) => {
    res.status(200).json("Сервер работает")
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const start = async () => {
    try {
        await mongoose.connect(DATABASE_URL)
        app.listen(PORT, () => console.log(`Сервер запущен на ${PORT}`))
    } catch (error) {
        console.log("Ошибка при запуске сервера", error);
    }
}

start()