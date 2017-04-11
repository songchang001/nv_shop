<?php
	require('init.php');

    @$pageNum = $_REQUEST['pageNum'] or $pageNum = 1;
    @$keyword = $_REQUEST['keyword'];


    $output['pageNum'] = intval($pageNum);
    $output['pageSize'] = 30;
    if($keyword){
        $sql = "SELECT COUNT(*) FROM nv_product WHERE pname LIKE '%$keyword%'";
    }else{
        $sql = "SELECT COUNT(*) FROM nv_product";

    }
    $result = mysqli_query($conn,$sql);
    $output['totalRecord'] = intval(mysqli_fetch_row($result)[0]);
    $output['pageCount'] = ceil($output['totalRecord']/$output['pageSize']);

    $start = ($output['pageNum']-1)*$output['pageSize'];
    $count = $output['pageSize'];

    if($keyword){
        $sql = "SELECT * FROM nv_product WHERE pname LIKE '%$keyword%' LIMIT $start,$count";
    }else{
        $sql = "SELECT * FROM nv_product LIMIT $start,$count";
    }


    $result = mysqli_query($conn,$sql);
    $output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

    echo json_encode($output);
?>