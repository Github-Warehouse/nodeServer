const userModel = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

class UserController {
    hashPassword(pwd) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(pwd, 10, (err, hash) => {
                resolve(hash)
            })
        })
    }

    comparePassword(pwd, hash) {
        return new Promise((resolve) => {
            bcrypt.compare(pwd, hash, function (err, res) {
                resolve(res)
            })
        })
    }

    async register(req, res, next) {
        res.set('Content-Type', 'application/json;charset=utf8')

        let user = await userModel.select(req.body)
        if (user) {
            res.render('success', {
                data: JSON.stringify({
                    message: '用户名已存在'
                })
            })
            return
        }


        // 密码加密
        let password = await userController.hashPassword(req.body.password)
        let result = await userModel.insert({
            ...req.body,
            password
        })

        // 构建json 接口
        if (result) {
            res.render('success', {
                data: JSON.stringify({
                    message: '注册成功'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '注册失败'
                })
            })
        }
    }

    genToken(username) {
        let key = fs.readFileSync(path.resolve(__dirname, '../keys/private.key'))
        return jwt.sign({ username }, key, { algorithm: 'RS256' })
    }

    async login(req, res, next) {
        res.set('Content-Type', 'application/json;charset=utf8')

        let result = await userModel.select(req.body)

        // 构建json 接口
        if (result) {
            if (await userController.comparePassword(req.body.password, result['password'])) {

                // 创建session 保存用户名
                // req.session.username = result['username']

                // 生成token，通过header发送
                res.header('X-Access-Token', userController.genToken(result.username))

                res.render('success', {
                    data: JSON.stringify({
                        username: result['username'],
                        message: '登录成功'
                    })
                })
            } else {
                res.render('fail', {
                    data: JSON.stringify({
                        message: '密码错误'
                    })
                })
            }
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '用户名不存在'
                })
            })
        }
    }
}

const userController = new UserController()

module.exports = userController