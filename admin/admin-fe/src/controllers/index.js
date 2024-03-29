import menuTpl from '../views/menu.html'
import homeTpl from '../views/home.hbs'
import Users from './users'

export const render = (req, res, next) => {
    // 装载menu
    $('.sidebar-menu').html(menuTpl)

    // 渲染登录注册
    new Users()

    // 返回路由的页面
    res.render(homeTpl({}))
}