/**
 * Created by songchang on 2017/2/28.
 */
$("#register").on("focus","input",function(){
    $(this).siblings("span").show();
});
$("#register").on("blur","input",function(){
    $(this).siblings("span").hide();
});





/*同意协议，启用按钮*/
$('#agree').click(function(){
    $("#btn-register").prop("disabled",!$('#agree').prop('checked')).toggleClass('disabled');
});



/*正则验证*/
var uname,upwd,phone;


$('#btn-register').click(function(){
    var reuname=unameCheck();
    var rephone=phoneCheck();
    var reupwd=upwdCheck();
    var reupwd2=upwd2Check();
    if(reuname&&rephone&&reupwd&&reupwd2){
        $.ajax({
            type:'post',
            url:'data/register.php',
            data:{uname:uname,phone:phone,upwd:upwd},
            success:function(d){
                console.log(d);
                if(d[0].code==1){
                    console.log(1);
                    sessionStorage.uid=d[0].uid;
                    sessionStorage.uname=d[0].uname;
                    alert('恭喜您注册成功！即将为您返回到注册前的页面！')
                    history.go(-1);
                }
            }
        });
    }
});

//用户名验证
function unameCheck(){
    uname=$.trim($('#u_name').val());
    var $unameI=$('#u_name').siblings('span');
    if(!uname){//为空
        console.log($unameI)
        $unameI.show().addClass("err").text('用户名不能为空');
        return false;
    }else{
        $unameI.hide();
        return true;
    }
}

//手机号验证
function phoneCheck(){
    phone=$.trim($('#u_phone').val());
    var $phoneI=$('#u_phone').siblings('span');
    var regPhone=/^1[3578]\d{9}$/;
    if(!phone){//为空
        $phoneI.show().addClass("err").text('手机号不能为空');
        return false;
    }else if(!regPhone.test(phone)){//格式不正确
        $phoneI.show().addClass("err").text('请输入正确的手机号格式');
        return false;
    }else if(phoneExist()){//已被注册
        $phoneI.show().addClass("err").text('该手机号已被其他用户绑定');
        return false;
    }else{
        $phoneI.hide();
        return true;
    }
}
//验证手机号是否被注册
function phoneExist(){
    var back;
    $.ajax({
        type:'post',
        url:'data/user_check_phone.php',
        data:{phone:phone},
        async:false,
        success:function(d){
            //console.log(d);
            if(d.code==1){
                back=true;
            }else{
                back=false;
            }
        }
    });
    return back;
}

//验证密码
function upwdCheck(){
    upwd=$.trim($('#u_pwd').val());
    var $upwdI=$('#u_pwd').siblings('span');
    if(!upwd){//为空
        $upwdI.show().addClass("err").text('密码不能为空');
        return false;
    }else if(upwd.length<6||upwd.length>12){//格式不正确
        $upwdI.show().addClass("err").text('密码长度应为6~12位');
        return false;
    }else{
        $upwdI.hide();
        return true;
    }
}
//验证重复密码
function upwd2Check(){
    var upwd2=$.trim($('#u_pwd_confirm').val());
    var $upwd2I=$('#u_pwd_confirm').siblings('span');
    if(!upwd2){//为空
        $upwd2I.show().addClass("err").text('密码不能为空');
        return false;
    }else if(upwd2.length<6||upwd2.length>12){//格式不正确
        $upwd2I.show().addClass("err").text('密码长度应为6~12位');
        return false;
    }else if(upwd2!=upwd){
        $upwd2I.show().addClass("err").text('两次密码不一致');
        return false;
    }else{
        $upwd2I.hide();
        return true;
    }
}