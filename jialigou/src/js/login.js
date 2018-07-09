require.config({
    paths : {
        'jquery' : './jquery',
        'http' : './httpclient',
        'common' : './common',
    }
})
require(['jquery','http','common'],function($,http,common){
    // 生成随机数字验证码
    // 自定义构造函数
    // if(common.Cookie.get('username')){
    //     location.href = './index.html';
    // }
    function Code(){
        this.num = common.randomNumber(0,9);
        this.color = common.randomColor();
        this.degree = common.randomNumber(-70,70) + 'deg';
        this.init();
    }
    Code.prototype.init = function(){
        $('<span>').css({color:this.color,transform:'rotate(' + this.degree + ')'}).text(this.num).appendTo($('#codeBox'));
    }
    function creatCode(){
        $('#codeBox').text("")
        for(var i = 0; i < 4; i++){
            new Code();
        }
    }
    
    creatCode();

    $('#codeBox').click(function(){
        creatCode();
        console.log($(this).text)
    })
    $('#loginBtn').click(function(){
        if($('#code').val().trim() == $('#codeBox').text().trim()){
            http.post('login.php',{
                username : $('#username').val().trim(),
                password : $('#password').val().trim()
            }).then(function(res){
                if(!res.status){
                    $('#code').val('');
                    $('#password').val('');
                    $('#username').val('');
                    creatCode();
                    alert('用户名或密码错误');
                }else{
                    if($('#autoBtn')[0].checked){
                        var now = new Date();
                        var keepDate = new Date(now.setDate(now.getDate() + 7));
                        common.Cookie.set('username',$('#username').val().trim(),keepDate);
                    }else{
                        common.Cookie.set('username',$('#username').val().trim());
                    }
                    location.href = './index.html';
                }
            }).catch(function(res){
                console.log(res);            
            })
        }else{
            $('#code').val('');
            creatCode();
            $('#code')[0].placeholder = '验证码错误';
        }
    })
})