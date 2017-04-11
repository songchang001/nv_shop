var app=angular.module("myApp",["ng","ngSanitize"]);
app.controller("parentCtrl",["$scope","$http",function($scope,$http){
    $scope.imgArray=[
        "img/banner1.jpg",
        "img/banner2.jpg",
        "img/banner3.jpg"
    ];
    $('.carousel').carousel();
}]);