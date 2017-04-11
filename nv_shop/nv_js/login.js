/**
 * Created by songchang on 2017/2/28.
 */
$("#btn-login").click(function(){
    if($("#uname").val()==""){
        $("#uname").siblings("p").show();
    }else if($("#upwd").val()=="") {
        $("#upwd").siblings("p").show()
    }
});
$("#uname,#upwd").keyup(function(){
    if(this.value!==""){
        $(this).siblings("p").hide()
    }
});

var save=null;
$("#automatic").change(function(){
    if(this.checked){
        save=true;
    }else{
        save=false;
    }
});

$("#btn-login").click(function(){
    var uname=$("#uname").val();
    var upwd=$("#upwd").val();
    $.get("data/login.php",{"uname":uname,"upwd":upwd},function(list){
        if(list.code==1){
            var uid=list.uid;
            var uname=list.uname;
            if(save){
                localStorage["uid"]=uid;
                localStorage["uname"]=uname;
            }else{
                sessionStorage["uid"]=uid;
                sessionStorage["uname"]=uname;
            }
            $("#login-result").hide();
            $("#btn-login").text("登陆成功");
            setTimeout(function(){
                history.go(-1);
                location.href="nv_shoppingCart.html";
            },500);
        }else{
            $("#login-result").show();
        }
    });
});

if(isLogin()){
    location.href="index.html";
}


$("#login_head").click(function(){
    location.href="index.html";
});