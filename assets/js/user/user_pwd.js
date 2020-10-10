$(function () {
    //1.自定义校验规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //新旧密码不一致
        onPwd: function (value) {
            var oldPwd = $('[name=oldPwd]').val()
            if (value == oldPwd) {
                return '请不要设置使用过的密码!'
            }
        },
        //两次新密码输入保持一致
        samePwd: function (value) {
            var newPwd = $('[name=newPwd]').val();
            if (value !== newPwd) {
                return '请保持两次密码输入一致!'
            }
        }
    })

    //2.提交表单
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您,修改密码成功!')
                $('.layui-form')[0].reset()
            }
        })
    })
})