<?php
    include 'dbhelper.php';
    $sql = isset($_GET['sql']) ? $_GET['sql'] : '';
    
    
    $result = query_oop($sql);
    $data = json_encode($result);
    echo "{status:true,data:$data}";

?>