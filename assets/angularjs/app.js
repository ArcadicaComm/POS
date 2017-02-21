var posApp = angular.module('posApp', ['ngRoute']);

posApp.config(function($locationProvider, $routeProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/list_product/:id', {
        templateUrl : 'list_product/list_product.php',
        controller  : 'scdController'
    })
})

posApp.controller('categoriesController', ['$scope', '$http', function($scope, $http){
    $http.get('http://webbase.com.vn/pos/category-api')
    .then(function(response){
        $scope.categories = response.data;
    },function(response){
        
    })
}])

posApp.controller('scdController', ['$scope', '$http', '$routeParams',function($scope, $http, $routeParams){
    $scope.category_id = $routeParams.id;
    $http.get('http://webbase.com.vn/pos/product-api')
    .then(function(response){
        $scope.products = response.data;
    },function(response){
        
    })
}])