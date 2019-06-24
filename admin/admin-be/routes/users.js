var express = require('express');
var router = express.Router();

const userController = require('../constrollers/users')

/* GET users listing. */
router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/isLogin',userController.islogin)
router.get('/logout',userController.logout)

module.exports = router;
