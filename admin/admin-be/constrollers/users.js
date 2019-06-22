const userModel = require('../models/users')
const bcrypt = require('bcryptjs')

class UserController {
    _hashPassword(pwd, cb) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(pwd, 10, (err, hash) => {
                resolve(hash)
            })
        })
    }

    async register(req, res, next) {
        res.set('Content-Type', 'application/json;charset=utf8')

        // 密码加密
        let username = req.body.username
        let password = req.body.password
        let hash = await userController._hashPassword(password)
        let result = await userModel.insert({ ...req.body, username: username, password: hash })

        // 构建json 接口
        if (result) {
            res.render('success', {
                data: JSON.stringify({
                    message: '数据插入成功'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '数据插入失败'
                })
            })
        }
    }

    async login(req, res, next) {
        let result = await userModel.select(req.body.username)
        
        // 构建json 接口
        if (result) {
            res.render('success', {
                data: JSON.stringify({
                    message: '登录成功'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '登录失败'
                })
            })
        }
    }
}

const userController = new UserController()

module.exports = userController