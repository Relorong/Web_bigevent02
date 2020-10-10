// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

//2.上传头像文件
$('#btnChooseImage').on('click', function () {
    $('#file').click()
})

//3.修改裁剪照片
$('#file').on('change', function (e) {
    //3.1 拿到用户选择的文件
    var file = e.target.files[0];
    //3.1.1 判断上传文件是否为空
    console.log(e);
    if (file == undefined) {
        return layer.msg('请选择要上传的图片')
    }
    //3.2 根据选择的文件，创建一个对应的 URL 地址
    var newImgURL = URL.createObjectURL(file)
    //3.3 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`
    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
})

//4.上传修改照片
$('#btnUpload').on('click', function () {
    var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            //弹出提示框
            layer.msg('恭喜您,头像修改成功!')
            //重新渲染头像
            window.parent.getUserInfo()
        }
    })
})

//5.页面默认头像显示
getUserInfo();
function getUserInfo() {
    var layer = layui.layer;
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            console.log(res);
            $image
                .cropper('destroy')              // 销毁旧的裁剪区域
                .attr('src', res.data.user_pic)  // 重新设置图片路径
                .cropper(options)                // 重新初始化裁剪区域
        }
    })
}