<?php
	require('init.php');

	@$nm=$_REQUEST['uname'] or die('{"code":3,"msg":"uname required"}');
    @$pwd=$_REQUEST['upwd'] or die('{"code":4,"msg":"upwd required"}');


    $sql="SELECT * FROM nv_user WHERE uname='$nm' AND upwd='$pwd'";
    $result=mysqli_query($conn,$sql);


    $list=mysqli_fetch_assoc($result);
    if($list===null){
        echo '{"code":2,"msg":"用户名或密码错误"}';
    }else{
        $arr=['code'=>1,'uname'=>$nm,'uid'=>$list['uid']];
        $list=json_encode($arr);
        echo $list;
    }
?>