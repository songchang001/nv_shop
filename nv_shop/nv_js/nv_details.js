/**
 * Created by web on 2017/2/27.
 */

var str=location.search;
var pid=str.substr(str.lastIndexOf('=')+1);



/*鼠标放小图上，切换中图*/
    $("#spec-list>ul").on("mouseover","li",function(){
        $(this).parent("ul").children("li").removeClass("active");
        $(this).addClass("active");
        var src=$(this).children("img")[0].src;
        src=src.replace(/_sma/,"");
        $("#preview>img")[0].src=src;
    });
/*鼠标进入中图，显示大图*/
    $("#superMark").mousemove(function(){
        $("#mark").css("display","block");
        var e=window.event||arguments[0];
        var x=e.offsetX;
        var y=e.offsetY;
        var markH=$("#mark").height();
        var top=y-markH/2 , left=x-markH/2;
        top=top<0?0:
            top>175?175:
                top;
        left=left<0?0:
            left>175?175:
                left;
        $("#mark").css({
            "top":top,
            "left":left
        });
        var src=$("#preview>img")[0].src;
        var i=src.lastIndexOf(".");
        $("#big-preview").css({
            "display":"block",
            "background":"url("+src.slice(0,i-2)
            +"_lar"
            +src.slice(i-2)
            +")"+" no-repeat "+-left*7/4+"px -"+top*7/4+"px"
        });

        $("#big-preview").css("display","block");
    }).mouseout(function(){
        $("#mark").css("display","none");
        $("#big-preview").css("display","none");
    });

//选择样式（颜色、尺寸、白条）
$("#sel-color,#sel-size,#lous").on("click","span",function(){
    $(this).siblings("span").removeClass("active");
    $(this).addClass("active");
});

//产品细节部分-tab标签切换
$("#details-tab>ul").on("click","li",function(){
    $(this).siblings("li").removeClass("hover");
    $(this).addClass("hover");
    if(this.value==1){
        $("#introduce,#details_content,#promise,#declare").css("display","block");
    }else if(this.value==2){
        $("#introduce,#details_content,#promise,#declare").css("display","none");
    }else if(this.value==3){
        $("#introduce,#details_content").css("display","none");
        $("#promise,#declare").css("display","block");
    }
});






var app=angular.module("myApp",["ng"]);

app.controller("parentCtrl",["$scope","$http",function($scope,$http){
    $http.get("data/sel_detail.php"+str).success(function(result){
        $scope.list=result;
        console.log(result);
    });

    $scope.add_cart=function(){
        if(isLogin()){
            $http.get("data/cart_add.php?uid="+uid+"&pid="+pid).success(function(result){
                console.log(result);
                if(result.code==1){
                    alert("添加成功");
                    getCartCount(uid);
                }

            });
        }else{
            location.href="login.html";
        }
    }


}]);