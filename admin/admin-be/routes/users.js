var express = require('express');
var router = express.Router();

const userController = require('../constrollers/users')
const oAuthMiddlewares= require('../middlewares/oAuth')

/* GET users listing. */
router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/islogin',oAuthMiddlewares)

module.exports = router;
