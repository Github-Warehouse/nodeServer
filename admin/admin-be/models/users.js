const db = require('../utils/db')

const userModel = {
    _init() {
        this.Usermodel = db.model('users', {
            username: String,
            password: String
        })
    },

    // 数据存储
    insert(data) {
        // 实例化model，传入要插入的数据
        let users = new this.Usermodel(data)
        return users.save()
    },

    // 查询单条数据
    select(username) {
        return this.Usermodel.findOne({ username })
    }

    // constructor() {
    //     db.model('users', {
    //         username: String,
    //         password: String
    //     })
    // }
    // insert(data) {
    //     let users = new this.userModel(data)
    //     return users.save()
    // }
    // select(data) {
    //     return this.userModel.findOne({ username: data.username })
    // }
}

// 初始化
userModel._init()

module.exports = userModel

