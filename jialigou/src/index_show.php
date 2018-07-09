<?php
     session_start();
    
    include "dbhelper.php"; 

    $idx = !isset($_POST["idx"]) ? "" : $_POST["idx"];

    $sql = "select * from products where sortAll='$idx' and isindex>0 and hot=0 and new=0";

    $result = query_oop($sql);
    $data = json_encode($result);
    echo "{status:true,data:$data}";
?>