/**
 * Created by songchang on 2017/2/28.
 */



$("#selector,#sort").on("click","li",function(){
    $(this).siblings("li").removeClass("active");
    $(this).addClass("active");
});

var app=angular.module("myApp",["ng"]);
app.controller("parentCtrl",["$scope","$http",function($scope,$http){
    $scope.getList=function(n){
        if(n<1){return}

        $http.get("data/select.php"+location.search+"&pageNum="+n).success(function(result){
            if(n>result.pageCount){return}
            $scope.data=result;
            if(n!=1){jQuery(window).scrollTop(550);}
            /*页码数组*/
            $scope.pageArray = [];
            if(result.pageNum>2&&result.pageNum<result.pageCount-1){
                for(var i=-2;i<3;i++){
                    $scope.pageArray[i+2]=parseInt(result.pageNum)+i
                }
            }else if(result.pageNum<=2){
                if(result.pageCount>5){
                    $scope.pageArray=[1,2,3,4,5];
                }else{
                    for(var i=0;i<result.pageCount;i++){
                        $scope.pageArray[i]=i+1
                    }
                }

            }else if(result.pageNum>result.pageCount-2){
                if(result.pageCount>5){
                    $scope.pageArray=[result.pageCount-4,result.pageCount-3,result.pageCount-2,result.pageCount-1,result.pageCount];
                }else{
                    for(var i=result.pageCount;i>0;i--){
                        $scope.pageArray.unshift(i)
                    }
                }
            }
            $("#search_kw").val(decodeURIComponent(location.search.slice(9)));
        });
    };
    $scope.getList(1);
}]);
