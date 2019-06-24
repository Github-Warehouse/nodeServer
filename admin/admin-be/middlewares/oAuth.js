const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const oAuth = (req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf8')
    let token = req.header('X-Access-Token')
    let key = fs.readFileSync(path.resolve(__dirname, '../keys/public.key'))
    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            res.render('fail', {
                data: JSON.stringify({
                    isLogin: false
                })
            })
        } else {
            res.render('success', {
                data: JSON.stringify({
                    username: decoded.username,
                    isLogin: true
                })
            })
        }
    })
}

module.exports = oAuth