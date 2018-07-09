<?php
    include 'dbhelper.php';
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    
    
    //判断是否导入相同的用户名
    $sql = "select * from users where username = '$username'";
    if($apiArr = query_oop($sql)){
        echo '{status: false, message: "用户名已注册！"}';
    }else{
        
        $sql = "insert into users(username,password) value('$username','$password')";
        
        excute_oop($sql);

        echo '{status: true, message: "注册成功！"}';
    }

?>