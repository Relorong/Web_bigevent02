$(function () {
    // 登录注册切换功能
    $('.link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('.link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //自定义表单验证
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return "两次密码输入不一致!"
            }
        }
    })

    //注册功能
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            succdess: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('恭喜您,用户注册成功!')
                $('.link_login').click()
                $('#form_reg')[0].reset()
            }
        })
    })
    //登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('恭喜您,登录成功!')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})