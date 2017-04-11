<?php
/*
通用php页面，由其他功能页面调用
*/
header('Content-Type:application/json;charset=UTF-8');
$conn=mysqli_connect('127.0.0.1','root','','nv_shop',3306);
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);

$output=[];

