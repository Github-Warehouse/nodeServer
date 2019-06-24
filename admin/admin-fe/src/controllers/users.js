import userTpl from '../views/user.html'

class Users {
    constructor() {
        this._renderUserTpl({ isSignin: false })
    }

    _renderUserTpl({ isSignin = false, username = '' }) {
        // 认证
        $.ajax({
            url: '/api/users/isLogin'
        }).done((result) => {
            let template = Handlebars.compile(userTpl)
            let renderUserTpl = template({
                isSignin: result.data.isLogin,
                username: result.data.username
            })
            $('.user-menu').html(renderUserTpl)
            this._user()
        })
    }

    // 渲染user模板，绑定登录注册事件
    _user() {
        let that = this

        $('.user-menu').on('click','#logout',()=>{
            $.ajax({
                url:'/api/users/logout'
            }).done(()=>{
                location.reload()
            })
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
            }).done((result) => {
                if (type === 'login') {
                    this._loginSuc(result)
                } else {
                    alert(result.data.message)
                }
            })
        })
    }

    _loginSuc(result) {
        if (result.ret) {
            this._renderUserTpl({
                isSignin: true,
                username: result.data.username
            })
        }else{
            alert(result.data.message)
        }
    }

}

export default Users