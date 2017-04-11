<?php
	@$did = $_REQUEST['did'] or die('did required');
    require('init.php');
    $sql = "DELETE FROM nv_cart_details WHERE did=$did";
    $result = mysqli_query($conn,$sql);
    if($result){
      $output['code']=1;
      $output['msg']='succ';
    }else {
      $output['code']=400;
    }
    echo json_encode($output);