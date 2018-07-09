<?php 
    include "dbhelper.php"; 

    $option = !isset($_GET["option"]) ? "" : $_GET["option"];
    $value = !isset($_GET["value"]) ? "" : $_GET["value"];
    $limit = !isset($_GET["limit"]) ? "" : $_GET["limit"];

    $sql = "select * from products where $option='$value'".$limit;
    $result = query_oop($sql);
    $data = json_encode($result);
    echo "{status:true,data:$data}";
?>