import menuTpl from '../views/menu.html'
import userTpl from '../views/user.html'
import homeTpl from '../views/home.hbs'

function _renderUserTpl({ isSignin = false }) {
    let template = Handlebars.compile(userTpl)
    let renderUserTpl = template({
        isSignin
    })
    $('.user-menu').html(renderUserTpl)
}

// 渲染user模板，绑定登录注册事件
function _user(res) {
    _renderUserTpl({})
    $('#user').on('click', 'span', function (e) {
        // e.stopPropagation()
        if ($(this).attr('id') === 'user-login') {
            $('.box-title').html('登录')
        } else {
            $('.box-title').html('注册')
        }
    })
}

// 用户注册
function _register() {
    $('#confirm').on('click', () => {
        $.ajax({
            url: '/api/users/register',
            type: 'POST',
            data: $('#user-form').serialize()
        })
    })
}

export const render = (req, res, next) => {
    $('.sidebar-menu').html(menuTpl)
    _renderUserTpl({ isSignin: false })
    _user(res)

    _register()

    // 返回路由的页面
    res.render(homeTpl({}))
}