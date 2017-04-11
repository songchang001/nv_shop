<?php
	require('init.php');
	@$uname=$_REQUEST['uname'] or die('[{"code":3,"msg":"用户名缺失"}]');
    @$upwd=$_REQUEST['upwd'] or die('[{"code":3,"msg":"用户密码缺失"}]');
    @$phone=$_REQUEST['phone'] or die('[{"code":3,"msg":"用户电话缺失"}]');

    $sql="INSERT INTO nv_user VALUES(NULL,'$uname','$upwd','$phone')";
    $result=mysqli_query($conn,$sql);
    if($result===false){
        echo "[{'code':4,'msg':'$sql 语句错误'}]";
    }else{
        $userId=mysqli_insert_id($conn);
        echo '[{"code":1,"uid":'.$userId.',"uname":'.$uname.'}]';
    }
?>