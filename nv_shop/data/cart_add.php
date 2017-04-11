<?php
require('init.php');

@$uid=$_REQUEST['uid'] or die('uid required');
@$pid=$_REQUEST['pid'] or die('pid required');


$sql="SELECT cid FROM nv_cart WHERE userId=$uid";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
if($row){//购物车存在
    $ctid=$row[0];
}else{//购物车不存在
    $sql="INSERT INTO nv_cart VALUES(NULL,$uid)";
    mysqli_query($conn,$sql);
    $ctid=mysqli_insert_id($conn);
}



$sql="SELECT did,count FROM nv_cart_details WHERE cartId=$ctid AND productId=$pid";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row){
 	$count=$row['count']+1;
    $sql="UPDATE nv_cart_details SET count='$count' WHERE cartId=$ctid AND productId='$pid'";
    $result=mysqli_query($conn,$sql);
    $output['code']=1;
    $output['msg']='succ';
}else{
    $sql="INSERT INTO nv_cart_details VALUES(NULL,$ctid,$pid,1,2)";
    mysqli_query($conn,$sql);
    $output['code']=1;
    $output['msg']='succ';
}
echo json_encode($output);