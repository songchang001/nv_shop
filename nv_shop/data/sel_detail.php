<?php
	@$pid = $_REQUEST['pid'] or die('pid required');
    require('init.php');

	$sql="SELECT * FROM nv_product WHERE pid=$pid";
    $result=mysqli_query($conn,$sql);

    echo json_encode(mysqli_fetch_assoc($result));