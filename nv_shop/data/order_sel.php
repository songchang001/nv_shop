<?php
	@$uid = $_REQUEST['uid'] or die('{"code":2,"msg":"uid required"}');

    require('init.php');

    $sql = "SELECT * FROM nv_order WHERE userId=$uid";
    $result = mysqli_query($conn,$sql);
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);

    echo json_encode($result);