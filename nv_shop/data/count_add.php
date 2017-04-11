<?php
	@$did = $_REQUEST['did'] or die('did required');
	@$i = $_REQUEST['i'] or die('i required');
    require('init.php');

    $sql="SELECT count FROM nv_cart_details WHERE did=$did";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);
    $count=$row['count']+$i;
    if($count>0&&$count<99){
        $sql="UPDATE nv_cart_details SET count='$count' WHERE did=$did";
        $result=mysqli_query($conn,$sql);
    }

?>