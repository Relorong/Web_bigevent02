var baseUrl = 'http://ajax.frontend.itheima.net'

$.ajaxPrefilter(function (options) {
    options.url = baseUrl + options.url;

    //为有权限的接口统一设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }

    //拦截,如果身份认证失败则返回登录页面
    options.complete = function (res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
            //删除本地存储
            localStorage.removeItem('token')
            //跳转页面
            location.href = '/login.html'
        }
    }
})