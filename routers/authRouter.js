const Router = require('express')
const router = new Router
const controller = require('../controllers/authController.js');
const { check } = require('express-validator');

router.post('/registration', [
    check('name', "Имя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть не меньше 4 и больше 10 символов").isLength({ min: 4, max: 10})
],controller.registration);
router.post('/login', controller.login);

module.exports = router