/**
 * Created by songchang on 2017/2/26.
 */
$("#head_box").load("header.html",function(){
    isLogin();
    $("#quit").click(function(){
        exit();
        isLogin();
    });


    $("#shoppingCart").click(function(){
        open("nv_shoppingCart.html","_blank");
    })

    $("#search").click(function(){
        var kw=$("#search_kw").val();
        open("nv_productList.html?keyword="+kw,"_blank");
    });



    $("#add_cart").click(function(event){
        var offset = $("#end").offset();
        console.log(offset);
        var addcar = $(this);
        var img = "img/car.png";
        var flyer = $('<img class="u-flyer" src="'+img+'">');
        flyer.fly({
            start: {
                left: event.pageX,
                top: event.pageY
            },
            end: {
                left: offset.left+10,
                top: offset.top+10,
                width: 0,
                height: 0
            },
            onEnd: function(){
                $("#msg").show().animate({width: '250px'}, 200).fadeOut(1000);
                this.destory();
            }
        });
    });


});
$("#foot_help_box").load("foot_help.html");
$("#foot_box").load("footer.html");
$("#foot_box_sim").load("footer_sim.html");


var uid=localStorage.uid?localStorage.uid:sessionStorage.uid;
var uname=localStorage.uname?localStorage.uname:sessionStorage.uname;


//函数-是否登录
function isLogin(){
        uid=localStorage.uid?localStorage.uid:sessionStorage.uid;
        uname=localStorage.uname?localStorage.uname:sessionStorage.uname;
        if(uname&&uname!=undefined){
            $("#head_login").html("欢迎回来："+uname+" <a id='quit'>退出</a>");
            return true;
        }else{
            $("#head_login").html('<a href="login.html">你好，请登录</a> &nbsp;&nbsp;<a href="nv_register.html">免费注册</a>');
            return false;
        }
}

//退出
function exit(){
    console.log(1)
    if(localStorage.uname){
        localStorage.removeItem("uname");
        localStorage.removeItem("uid");
    }else{
        sessionStorage.removeItem("uname");
        sessionStorage.removeItem("uid");
    }
    uid=localStorage.uid?localStorage.uid:sessionStorage.uid;
    uname=localStorage.uname?localStorage.uname:sessionStorage.uname;
    console.log(uid);
    console.log(uname);
}
isLogin();
$("#quit").click(function(){

    exit()
    isLogin();
});


function getCartCount(uid){
    var count=0;
    $.get("data/cart_select.php?uid="+uid,function(result){
        if(result.code!=0){
            var list=result.data;
            for(var i=0;i<list.length;i++){
                count+=parseInt(list[i].count);

            }
            $("#cart_count").html(count);
        }

    });
}
getCartCount(uid);



$("#login_head").click(function(){
    location.href="index.html";
});

