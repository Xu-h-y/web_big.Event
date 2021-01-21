$(function() {
    //点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        //点击“去登录的”链接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })


    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        uname: [/^[a-zA-Z0-9]+$/],
        rpwd: function(value) {
            console.log(value);
            var pwd = $('#pwd').val();
            if (pwd !== value) {
                return '两次密码不一致！';
            }
        }
    })



    //监听表单注册
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: "/api/reguser",
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                } else {
                    $('#link_login').click();
                    layer.msg(res.message);
                }
            }
        })
    })


    //监听表单登录
    $('#form-into').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                } else {
                    localStorage.setItem('token', res.token);
                    location.href = "index.html";
                    return layer.msg('登录成功！');
                }
            }
        })
    })
})