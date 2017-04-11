<?php
	@$uid = $_REQUEST['uid'] or die('uid required');
    require('init.php');
    $output['uid'] = $uid;

    $sql="SELECT cid FROM nv_cart WHERE userId=$uid";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_row($result);
    if($row){//购物车存在
        $ctid=$row[0];
    }else{//购物车不存在
		die('{"code":0}');
    }


    $sql = "SELECT COUNT(*) FROM nv_product,nv_cart_details WHERE nv_cart_details.productId=nv_product.pid AND nv_cart_details.cartId=$ctid";
    $result = mysqli_query($conn,$sql);
    $output['count'] = intval(mysqli_fetch_row($result)[0]);
    if($output['count']==0){
        die('{"code":0}');
    }else{
        $sql = "SELECT pname,price,pic_s,count,pid,did,status FROM nv_product,nv_cart_details WHERE nv_cart_details.productId=nv_product.pid AND nv_cart_details.cartId=$ctid";
        $result = mysqli_query($conn,$sql);
        $output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);
        $output['code'] = 1;
        echo json_encode($output);
    }

?>