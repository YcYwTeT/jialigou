require.config({
    paths : {
        'jquery' : './jquery',
        'http' : './httpclient',
        'common' : './common',
    }
})
require(['jquery','http','common'],function($,http,common){
    $(function(){
        $('#loadBtn').click(function(){
            var username =  $('input').eq(0).val();
            var password =  $('input').eq(1).val();
            var password_again =  $('input').eq(2).val();
            if(!/^1[3-8]\d{9}$/i.test(username)){
                alert('手机号不合法');
                return false;
            }
            if(!/^[a-zA-Z][a-zA-Z0-9_]{5,16}$/.test(password)){
                alert('密码不合法,字母开头,6~14位,只能包含字母数字下划线');
                return false;
            }
            if(password_again != password){
                alert('两次密码输入不一致');
                return false;
            }
            if($('#readReady').prop('checked') == false){
                alert('请阅读相关条款并勾选')
                return false;
            }
            else{
                 http.post('./register.php',{
                    username : $('#username').val().trim(),
                    password : $('#password').val().trim()
                }).then(function(res){
                    if(res.status){
                        common.Cookie.set('username',$('#username').val().trim());
                        location.href = '../src/index.html';
                    }else{
                        alert(res.message)
                    }
                }).catch(function(res){
                    console.log(res);
                })
            }
        })
    })
})