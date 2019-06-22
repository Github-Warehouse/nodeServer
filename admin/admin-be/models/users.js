const db = require('../utils/db')

class UserModel {
    constructor() {
        this.userModel = db.model('users', {
            username: String,
            password: String
        })
    }

    // 数据存储
    insert(data) {
        // 实例化model，传入要插入的数据
        let users = new this.userModel(data)
        return users.save()
    }

    // 数据查询
    select(data) {
        return this.userModel.findOne({ username: data.username })
    }
}

module.exports = new UserModel()

