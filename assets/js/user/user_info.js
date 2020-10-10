$(function () {
    //1.自定义校验规则
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户昵称长度为1-6之间'
            }
        }
    })

    //2: 渲染-默认显示用户信息
    initUserInfo()
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            method: 'GEt',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //渲染到页面上
                form.val('formUserInfo', res.data)
            }
        })
    }

    //3.表单重置
    //点击重置按钮,让表单恢复默认值
    $('#reset').on('click', function (e) {
        //阻止默认行为
        e.preventDefault();
        //重新渲染表单内容
        initUserInfo()
    })

    //4: 提交并修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //用户信息提交成功后需要重新渲染页面中的用户信息
                window.parent.getUserInfo()
                //弹出提示框
                layer.msg('恭喜您,用户信息提交成功!')
            }
        })
    })
})