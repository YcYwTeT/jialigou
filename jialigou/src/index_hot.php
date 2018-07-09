<?php
    session_start();
    
    include "dbhelper.php"; 

    $opt = !isset($_GET["opt"]) ? "" : $_GET["opt"];
    $value = !isset($_GET["value"]) ? "" : $_GET["value"];


    $sql = "select * from products where $opt=$value";
    $result = query_oop($sql);
    $data = json_encode($result);
    echo "{status:true,data:$data}";
?>