import userTpl from '../views/user.html'

class Users {
    constructor() {
        // this._renderUserTpl({ isSignin: false })
        this._oAuth()
    }

    // 认证
    _oAuth() {
        $.ajax({
            url: '/api/users/islogin',
            headers: {
                'X-Access-Token': localStorage.getItem('token') || ''
            }
            // dataType: 'json'
        }).done((result) => {
            this._renderUserTpl({
                isSignin: result.data.isLogin,
                username: result.data.username
            })
        }).fail(() => {
            this._renderUserTpl({
                isSignin: false
            })
        })
    }

    _renderUserTpl({ isSignin = false, username = '' }) {
        let template = Handlebars.compile(userTpl)
        let renderUserTpl = template({
            isSignin,
            username
        })
        $('.user-menu').html(renderUserTpl)
        this._user()
    }

    // 渲染user模板，绑定登录注册事件
    _user() {
        let that = this

        $('.user-menu').on('click', '#logout', () => {
            localStorage.removeItem('token')
            location.reload()
        })

        $('#user').on('click', 'span', function (e) {
            // e.stopPropagation()
            if ($(this).attr('id') === 'user-login') {
                $('.box-title').html('登录')
                that._doSigin('/api/users/login', 'login')
            } else {
                $('.box-title').html('注册')
                that._doSigin('/api/users/register', 'register')
            }
        })
    }

    // 登录注册Ajax
    _doSigin(url, type) {
        $('#confirm').off('click').on('click', async () => {
            $.ajax({
                url,
                type: 'POST',
                data: $('#user-form').serialize()
            }).done((result, statusCode, jqXHR) => {
                if (type === 'login') {
                    this._loginSuc(result, jqXHR)
                } else {
                    alert(result.data.message)
                }
            })
        })
    }

    _loginSuc(result, jqXHR) {
        if (result.ret) {
            this._renderUserTpl({
                isSignin: true,
                username: result.data.username
            })
        } else {
            alert(result.data.message)
        }

        // 存储 token
        localStorage.setItem('token', jqXHR.getResponseHeader('X-Access-Token'))
    }
}

export default Users