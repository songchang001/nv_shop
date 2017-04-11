<?php
    @$pid = $_REQUEST['pid'] or die('{"code":2,"msg":"pid required"}');
    @$pname = $_REQUEST['pname'] or die('{"code":2,"msg":"pname required"}');
    @$pic_s = $_REQUEST['pic_s'] or die('{"code":2,"msg":"pic_s required"}');
    @$price = $_REQUEST['price'] or die('{"code":2,"msg":"price required"}');
    @$userId = $_REQUEST['uid'] or die('{"code":2,"msg":"uid required"}');
    @$did = $_REQUEST['did'] or die('{"code":2,"msg":"did required"}');
    $orderTime = time()*1000;

    require('init.php');

    $sql = "INSERT INTO nv_order VALUES(NULL,'$pid','$pname','$price','$pic_s','$orderTime','$userId')";
    $result = mysqli_query($conn,$sql);
    $orderId = mysqli_insert_id($conn);


    $sql = "DELETE FROM nv_cart_details WHERE did=$did";
    mysqli_query($conn,$sql);

    $output['code']=1;
    $output['orderId']=$orderId;

    echo json_encode($output);