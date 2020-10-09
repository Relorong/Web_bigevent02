$(function () {
    getUserInfo()

    //3.推出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //1.删除本地存储的token值
            localStorage.removeItem('token')
            //2.跳转页面
            location.href = '/login.html'
            //3.关闭询问框
            layer.close(index);
        });
    })
})

//1.封装获取用户信息函数
function getUserInfo() {
    var layer = layui.layer;
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            console.log(res);
            renderAvatar(res.data)
        }
    })
}

//2.封装渲染用户信息函数
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.user_avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.user_avatar').show().html(text)
    }
}