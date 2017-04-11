/**
 * Created by songchang on 2017/3/1.
 */
var app=angular.module("myApp",["ng"]);
app.controller("parentCtrl",["$scope","$http",function($scope,$http){
    function sel(){
        $http.get("data/cart_select.php?uid="+uid).success(function(result){
            $scope.data=result;
            if(result.data){
                var list=result.data;
                $scope.total=0;
                for(var i=0;i<list.length;i++){
                    if(list[i].status==1){
                        $scope.total+=(parseFloat(list[i].price*list[i].count));
                    }
                }
            }
        })
    }
    if(isLogin()){
        sel();
    }else{
        location.href="login.html";
    }

    $scope.changeCount=function(did,i){
        $http.get("data/count_add.php?did="+did+"&i="+i).success(function(){
            sel();
            getCartCount(uid);

        });
    }
    $scope.del_cart=function(did){
        var r=confirm("确定要删除？");
        if(r){
            $http.get("data/del_cart.php?did="+did).success(function(result){
                if(result.code=1){
                    alert("删除成功");
                    getCartCount(uid);
                    sel();
                }
            })
        }
    }
    $scope.order_add=function(data){
        var uid=data.uid;
        var list=data.data;
        for(var i=0;i<list.length;i++){
            if(list[i].status==1){
                $http.get("data/order_add.php?pid="+list[i].pid+"&pname="+list[i].pname+"&price="+list[i].price+"&pic_s="+list[i].pic_s+"&uid="+uid+"&did="+list[i].did).success(function(result){
                    if(result.code==1){
                        sel();
                        var r=confirm("订单添加成功，编号为："+result.orderId+"\n去查看？");
                        if(r){
                            location.href="nv_usercenter.html";
                        }
                    }
                })
            }
        }

    }
    $scope.changeStatus=function(did,sta){
        if(sta){
            $http.get("data/cart_changeStute.php?did="+did+"&status=1");
        }else{
            $http.get("data/cart_changeStute.php?did="+did+"&status=2");
        }
        sel();
    }
}]);