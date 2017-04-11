/**
 * Created by songchang on 2017/3/2.
 */
var app=angular.module("myApp",["ng"]);
app.controller("parentCtrl",["$scope","$http",function($scope,$http){
    function sel(){
        $http.get("data/order_sel.php?uid="+uid).success(function(result){
            $scope.data=result;
            console.log(result);
        })
    }
    if(isLogin()){
        sel();
    }else{
        location.href="login.html";
    }
}]);