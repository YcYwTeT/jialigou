<?php
    include 'dbhelper.php';
    $sql = isset($_GET['sql']) ? $_GET['sql'] : '';
    
    // echo "{sql: '$sql'}"
    $result = query_oop($sql);
    $data = json_encode($result);
    echo "{status:true,data:$data}";

?>