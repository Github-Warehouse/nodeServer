var express = require('express');
var router = express.Router();

const userController = require('../constrollers/users')

/* GET users listing. */
router.post('/register',userController.register)

module.exports = router;
