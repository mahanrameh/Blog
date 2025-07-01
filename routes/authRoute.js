const express = require("express");
const authController = require("./../controllers/authController");
const registerSchema = require("./../validators/registerValidator");
const loginSchema = require("./../validators/loginValidator");
const varlidate = require("./../middlewares/validate");


const router = express.Router();


router
    .route('/register')
    .get(authController.showRegisterView)
    .post(varlidate(registerSchema, '/auth/register'), authController.register);


router
    .route('/login') 
    .get(authController.showLoginView)
    .post(varlidate(loginSchema, '/auth/login'), authController.login);


router
    .route('/refresh')
    .post(authController.refresh);


router
    .route('/me')
    .get(authController.getMe);


router
    .route('/logout')
    .post(authController.logout);


router
    .route('/captcha')
    .get(authController.getCaptcha);








module.exports = router;