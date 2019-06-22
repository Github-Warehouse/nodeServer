import userTpl from '../views/user.html'

class Users {
    constructor() {
        this._renderUserTpl({ isSignin: false })
        this._user()
    }

    _renderUserTpl({ isSignin = false }) {
        let template = Handlebars.compile(userTpl)
        let renderUserTpl = template({
            isSignin
        })
        $('.user-menu').html(renderUserTpl)
    }

    // 渲染user模板，绑定登录注册事件
    _user() {
        let that = this
        this._renderUserTpl({})
        $('#user').on('click', 'span', function (e) {
            // e.stopPropagation()
            if ($(this).attr('id') === 'user-login') {
                $('.box-title').html('登录')
                that._doSigin('/api/users/login')
            } else {
                $('.box-title').html('注册')
                that._doSigin('/api/users/register')
            }
        })
    }

    // 登录注册Ajax
    _doSigin(url) {
        $('#confirm').off('click').on('click', async () => {
            $.ajax({
                url,
                type: 'POST',
                data: $('#user-form').serialize()
            }).done(function (result) {
                alert(result.data.message)
            })
        })
    }
}

export default Users