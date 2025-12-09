const User = require('../models/User.js')
const bcrypt =  require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require("../config.js")

const generateAccessToken = (id, roles) => {
    const payload = {id, roles}
    return jwt.sign(payload, secret, { expiresIn: "24h" })
};




class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Ошибка при регистрации",
                    errors: errors.array()
                })
            }


            const { name, surname, phoneNumber, password, email  } = req.body;
            const candidate = await User.findOne({ email })
            
            if(candidate) {
                return res.status(400).json({
                    message: "Пользоватлеь с таким email уже существует"
                })
            }

            const hashPassword = bcrypt.hashSync(password, 7)
            const user = new User({
                name,
                surname,
                password: hashPassword,
                email,
            });

            await user.save()

            return res.json({ message: "Пользователь был успешно зарегистрирован"})
        } catch (error) {
            console.log("Ошибка при регистрации", error);
            return res.status(500).json({ message: "Registration error"})
        }
    }

    async login(req, res) {
        try {
            const { name, password} = req.body
            const user = await User.findOne({ name });

            if(!user)
                return res.status(400).json({
                    message: `Пользователь ${name} не был найден`
                })

            const validationPassword = bcrypt.compareSync(password, user.password)
            if(!validationPassword)
                return res.status(400).json({
                    message: "Пароль не верный"
                })

                const token = generateAccessToken(user._id);
                return res.json({ token })
        } catch (error) {
            console.log("Ошибка при входе в аккаунт", error);
            return res.status(500).json({
                message: "Login Error"
            });
        }
    }
}


module.exports = new authController();