<?php 
    session_start();
    
    include "dbhelper.php"; 

    $username = !isset($_POST["username"]) ? "" : $_POST["username"];
    $pwd = !isset($_POST["password"]) ? "" : $_POST["password"];

    $sql = "select * from users where username = '$username' and password = '$pwd'";

    $result = query_oop($sql);
    if(count($result) > 0){
        $_SESSION['user'] = $username;
        echo "{status: true, message: '登录成功！'}";
    } else {
        echo "{status: false, message: '登录失败！'}";
    }
?>