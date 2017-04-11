<?php
	require('init.php');
	@$did=$_REQUEST['did'] or die('did required');
	@$status=$_REQUEST['status'] or die('status required');


	$sql="UPDATE nv_cart_details SET status='$status' WHERE did=$did";
    $result=mysqli_query($conn,$sql);